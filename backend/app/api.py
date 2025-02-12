from flask import jsonify, request
from flask_restful import Api, Resource
from ultralytics import YOLO
import tempfile
import os
from app.models import *
import torch

model = YOLO('yolov8l.pt').to('cuda' if torch.cuda.is_available() else 'cpu')

model_1 = YOLO("best.pt").to('cuda' if torch.cuda.is_available() else 'cpu')

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
    class detect_objects(Resource):
        def post(self):
            if 'image' not in request.files:
                return {"error": "No image provided"}, 400

            image_file = request.files['image']
            temp_path = os.path.join(tempfile.gettempdir(), image_file.filename)
            image_file.save(temp_path)

            # Process image
            results = model.predict(source=temp_path)

            detections = []
            class_counts = {}

            for result in results:
                if hasattr(result, 'boxes'):
                    for box in result.boxes:
                        class_name = model.names[int(box.cls)]
                        confidence = float(box.conf)
                        
                        # Add to detections
                        detections.append({
                            'class': class_name,
                            'confidence': confidence
                        })
                        
                        # Update counts
                        class_counts[class_name] = class_counts.get(class_name, 0) + 1

            # Cleanup
            os.remove(temp_path)

            return {
                "counts": class_counts,
                "total_objects": len(detections)
            }, 200
        
    class DetectPlantDisease(Resource):
        def post(self):
            if 'image' not in request.files:
                return {"error": "No image provided"}, 400

            image_file = request.files['image']
            temp_path = os.path.join(tempfile.gettempdir(), image_file.filename)
            image_file.save(temp_path)

            # Run YOLO Model Prediction
            results = model_1.predict(source=temp_path)

            detections = []
            class_counts = {}

            for result in results:
                if hasattr(result, 'boxes'):
                    for box in result.boxes:
                        class_id = int(box.cls)
                        class_name = model_1.names[class_id]  # Get class name
                        confidence = float(box.conf)

                        # Store detection details
                        detections.append({
                            'class': class_name,
                            'confidence': round(confidence, 4)
                        })

                        # Count occurrences of each class
                        class_counts[class_name] = class_counts.get(class_name, 0) + 1

            # Cleanup temporary file
            os.remove(temp_path)

            # Return JSON response
            return {
                "counts": class_counts,
                "total_diseases_detected": len(detections),
                "detections": detections
            }, 200

    api.add_resource(GetData, "/get_data/<int:id>")
    api.add_resource(UpdateData, '/update')
    api.add_resource(detect_objects, '/detect_objects')
    api.add_resource(DetectPlantDisease, "/detect_plant_disease")


    return api
