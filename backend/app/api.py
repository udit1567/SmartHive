from flask import jsonify, request
from flask_restful import Api, Resource

from app.models import *

def initialize_api(app):
    api = Api(app)


    class GetData(Resource):
        def get(self, id):
            data = Data.query.filter_by(user_id=id).all()

            if not data:
                return {"message": "No data found for this user."}, 404
            data_dict = [
            {
                "id": item.id,
                "temperature": item.temperature,
                "humidity": item.humidity,
                "timestamp": item.timestamp.isoformat() if item.timestamp else None,
                "user_id": item.user_id
            } for item in data]

        # Return the serialized data with a 200 status code
            return {"data": data_dict}, 200



    class UpdateData(Resource):
        def post(self):
            data = request.get_json()
            api_token = request.headers.get('Authorization')
            temperature = data.get('temperature')
            humidity = data.get('humidity')

            if not api_token or not temperature or not humidity:
                return {"message": "Missing required parameters"}, 400

            user = User.query.filter_by(auth_token=api_token).first()

            if not user:
                return {"message": "Invalid or missing API token"}, 401

            new_data = Data(
                temperature=temperature,
                humidity=humidity,
                user_id=user.id
            )

            db.session.add(new_data)
            db.session.commit()

            return {
                "message": "Data successfully updated.",
                "data": "new_data.to_dict()"
            }, 200    

    api.add_resource(GetData, "/get_data/<int:id>")
    api.add_resource(UpdateData, '/update')

    return api
