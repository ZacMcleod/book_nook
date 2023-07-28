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
        favorites = Favorite.query.filter_by(book_id=book_id).all()
        average_rating = db.session.query(func.avg(Review.rating)).filter(Review.book_id == book_id).scalar()
        user_favored = db.session.query(favorites.includes(user_id))

        response = {
        'reviews': review_schema.dump(reviews, many=True),
        'average_rating': average_rating,
        'user_favored': user_favored

        }
        return jsonify(response), 200