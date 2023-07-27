from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Review
from database.schemas import review_schema
from marshmallow import ValidationError
import datetime

class UserReviews(Resource):
    @jwt_required()
    def post(self):
        review_data = request.get_json()
        user_id = get_jwt_identity()
        new_review = review_schema.load(review_data)
        new_review.user_id = user_id
        db.session.add(new_review)
        db.session.commit()
        return review_schema.dump(new_review), 201


    #@jwt_required()
    #def post(self):
    #    user_id = get_jwt_identity()
    #    form_data = request.get_json()
    #    new_car = car_schema.load(form_data)
    #    new_car.user_id = user_id
    #    db.session.add(new_car)
    #    db.session.commit()
    #    return car_schema.dump(new_car), 201