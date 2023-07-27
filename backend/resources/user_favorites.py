from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Review
from database.schemas import review_schema
from marshmallow import ValidationError
import datetime


class AllFavoriteResource(Resource):
    def get(self):
        pass
    

#class AllCarResource(Resource):
#    def get(self):
#        cars = Car.query.all()
#        make = request.args.get('make')
#        if make:
#            cars = Car.query.filter_by(make=make)
#        return cars_schema.dump(cars), 200