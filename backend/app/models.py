
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    source = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f'<User {self.username}>'
