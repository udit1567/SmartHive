from flask import request, jsonify,send_from_directory ,session, Blueprint, current_app as app
from .models import db, User
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required
import secrets
import string
from datetime import datetime, timezone, timedelta
import json
import os

BASE_FOLDER = "Detection images"

def generate_auth_token(length=8):
    characters = string.ascii_letters + string.digits
    return ''.join(secrets.choice(characters) for _ in range(length))

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return "hello from index page"

def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.password == password:
        access_token = create_access_token(identity=email)
        return jsonify({"email": user.email, "access_token": access_token ,"uid": user.id,"auth_token": user.auth_token}), 200

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

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response

@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    response = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(response)
    return response, 200

@app.route('/profile/<string:getemail>', methods=["GET"])
@jwt_required()
def my_profile(getemail):
    current_user_email = get_jwt_identity()
    if not current_user_email or current_user_email != getemail:
        return jsonify({"error": "Unauthorized Access"}), 401

    user = User.query.filter_by(email=getemail).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    response_body = {
        "id": user.id,
        "name": user.first_name,
        "email": user.email,
        "token": user.auth_token
    }

    return jsonify(response_body), 200

@app.route('/get-image/<category>/<api_token>/<filename>', methods=['GET'])
def get_image(category, api_token, filename):
    if category not in ["object-detection", "plant-disease"]:
        return {"error": "Invalid category"}, 400

    image_folder = os.path.join(BASE_FOLDER, category, api_token)
    image_path = os.path.join(image_folder, filename)

    # Debugging prints
    print("Looking for image at:", image_path)

    if not os.path.exists(image_path):
        return {"error": "Image not found"}, 404

    return send_from_directory(image_folder, filename)
