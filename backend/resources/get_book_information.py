from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Review
from database.schemas import review_schema
from marshmallow import ValidationError
import datetime

class GetBookInformation(Resource):
    current_user_id = get_jwt_identity()
    favorites = Review.book_id.query.filter_by(user_id = current_user_id)