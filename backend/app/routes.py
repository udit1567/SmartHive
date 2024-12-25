from flask import request, jsonify
from .models import db, User
from flask_socketio import socketio
import secrets
import string

def generate_auth_token(length=8):
    characters = string.ascii_letters + string.digits  # Alphanumeric characters
    return ''.join(secrets.choice(characters) for _ in range(length))


def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.password == password:
        return jsonify({"message": "Login successful!"}), 200

    return jsonify({"message": "Invalid credentials!"}), 401

def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    password = data.get('password')
    address = data.get('address')
    source = data.get('source')

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists!"}), 400

    auth_token = generate_auth_token()

    # Create a new user
    new_user = User(
        username=username,
        email=email,
        first_name=first_name,
        last_name=last_name,
        password=password,
        address=address,
        source=source,
        auth_token=auth_token
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Signup successful!", "auth_token": auth_token}), 201






