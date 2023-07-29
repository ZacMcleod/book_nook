from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Review, Favorite
from database.schemas import review_schema, favorites_schema
from sqlalchemy import func

class GetBookInformation(Resource):
    @jwt_required()
    def get(self, book_id):
        user_id = get_jwt_identity()

        reviews = Review.query.filter_by(body_id=book_id).all()
        if reviews:
            average_rating = sum([review.rating for review in reviews]) / len(reviews)
        else:
            average_rating = None

        user_favorite = Favorite.query.filter_by(user_id=user_id, book_id=book_id).first()
        is_favorited = user_favorite is not None

        response = {
        'reviews': review_schema.dump(reviews, many=True),
        'average_rating': average_rating,
        'is_favorited': is_favorited

        }
        return jsonify(response), 200