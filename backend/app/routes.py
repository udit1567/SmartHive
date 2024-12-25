from flask import request, jsonify
from .models import db, User

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

    new_user = User(
        username=username,
        email=email,
        first_name=first_name,
        last_name=last_name,
        password=password,
        address=address,
        source=source
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Signup successful!"}), 201
