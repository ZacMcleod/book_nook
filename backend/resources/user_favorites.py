from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Favorite, User
from database.schemas import favorites_schema
from marshmallow import ValidationError
import datetime


class UserFavoriteResource(Resource):

    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        favorites = Favorite.query.filter_by(user_id = current_user_id)
        return favorites_schema.dump(favorites, many=True), 200
    
    @jwt_required()
    def post(self):
        favorites_data = request.get_json()
        user_id = get_jwt_identity()
        new_favorite = favorites_schema.load(favorites_data)
        new_favorite.user_id = user_id
        db.session.add(new_favorite)
        db.session.commit()
        return favorites_schema.dump(new_favorite), 201
    

#class AllCarResource(Resource):
#    def get(self):
#        cars = Car.query.all()
#        make = request.args.get('make')
#        if make:
#            cars = Car.query.filter_by(make=make)
#        return cars_schema.dump(cars), 200