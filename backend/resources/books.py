from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Book
from database.schemas import book_schema, books_schema

class AllBookResource(Resource):
    def get(self):
        book = Book.query.all()
        # title = request.args.get('Title')
        #if title:
        #    books = Book.query.filter_by(title=title)
        #return books_schema.dump(books), 200
