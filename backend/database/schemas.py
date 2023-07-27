from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields
from database.models import User, Car, Review, Favorite

ma = Marshmallow()

# Auth Schemas
class RegisterSchema(ma.Schema):
    """
    Schema used for registration, includes password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    class Meta:
        fields = ("id", "username",  "password", "first_name", "last_name", "email")

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)
    
class UserSchema(ma.Schema):
    """
    Schema used for displaying users, does NOT include password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    class Meta:
        fields = ("id", "username", "first_name", "last_name", "email",)

register_schema = RegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)


# Car Schemas
class CarSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    make = fields.String(required=True)
    model = fields.String(required=True)
    year = fields.Integer()
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many=False)
    class Meta:
        fields = ("id", "make", "model", "year", "user_id", "user")
    
    @post_load
    def create_car(self, data, **kwargs):
        return Car(**data)

car_schema = CarSchema()
cars_schema = CarSchema(many=True)


# TODO: Add your schemas below

class ReviewSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    book_id = fields.Integer()
    text = fields.String()
    rating = fields.Integer()
    user_id = fields.Integer()
    class Meta:
        fields = ("id", "book_id", "text", "rating", "user_id")

review_schema = ReviewSchema()

class FavoriteSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    book_id = fields.Integer()
    title = fields.String()
    thumbnail_url = fields.String()
    user_id = fields.Integer()
    class Meta:
        fields = ("id", "book_id", "title", "thumbnail_url", "user_id")
