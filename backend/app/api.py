from flask import jsonify, request
from flask_restful import Api, Resource
from ultralytics import YOLO
import tempfile
import os
from app.models import *
import torch
import base64
from io import BytesIO
from PIL import Image

model = YOLO('yolov8l.pt').to('cuda' if torch.cuda.is_available() else 'cpu')

model_1 = YOLO("best.pt").to('cuda' if torch.cuda.is_available() else 'cpu')

BASE_FOLDER = "Detection images"

def get_latest_non_null(user_id, column):
    latest_entry = (
        Data.query.filter(
            getattr(Data, column).isnot(None),  # Filter out NULL values
            Data.user_id == user_id
        )
        .order_by(Data.timestamp.desc())  # Get the latest non-null value
        .first()
    )
    
    if latest_entry:
        return jsonify({column: getattr(latest_entry, column), "timestamp": latest_entry.timestamp.strftime("%d %B %Y %H:%M")})
    return jsonify({"message": f"No valid data found for {column}"}), 404

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
                    "D1": item.D1,
                    "D2": item.D2,
                    "D3": item.D3,
                    "D4": item.D4,
                    "D5": item.D5,
                    "D6": item.D6,
                    "D7": item.D7,
                    "D8": item.D8,
                    "timestamp": item.timestamp.isoformat() if item.timestamp else None,
                    "user_id": item.user_id
                } for item in data]
            
            # Return the serialized data with a 200 status code
            return {"data": data_dict}, 200



    class UpdateData(Resource):
        def post(self):
            data = request.get_json()
            api_token = request.headers.get('Authorization')
            D1 = data.get('D1')
            D2 = data.get('D2')
            D3 = data.get('D3')
            D4 = data.get('D4')
            D5 = data.get('D5')
            D6 = data.get('D6')
            D7 = data.get('D7')
            D8 = data.get('D8')

            if not api_token:
                return {"message": "Missing required parameters"}, 400

            user = User.query.filter_by(auth_token=api_token).first()

            if not user:
                return {"message": "Invalid or missing API token"}, 401

            new_data = Data(
                D1=D1,
                D2=D2,
                D3=D3,
                D4=D4,
                D5=D5,
                D6=D6,
                D7=D7,
                D8=D8,
                user_id=user.id
            )

            db.session.add(new_data)
            db.session.commit()

            return {
                "message": "Data successfully updated.",
                "data": new_data.to_dict()
            }, 200 
    class detect_objects(Resource):
        def post(self):
            api_token = request.headers.get('Authorization')

            if not api_token:
                return {"message": "Missing required parameters"}, 400

            user = User.query.filter_by(auth_token=api_token).first()

            if not user:
                return {"message": "Invalid or missing API token"}, 401

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
                        
                        detections.append({
                            'class': class_name,
                            'confidence': confidence
                        })

                        class_counts[class_name] = class_counts.get(class_name, 0) + 1

            # Define output directory structure
            base_folder = "Detection images"
            object_detection_folder = os.path.join(base_folder, "object-detection")  # New main folder
            user_folder = os.path.join(object_detection_folder, api_token)  # Unique folder for each user

            if not os.path.exists(user_folder):
                os.makedirs(user_folder)

            # Generate the next available image number
            existing_files = [f for f in os.listdir(user_folder) if f.endswith(".jpg")]
            existing_numbers = [int(f.split(".")[0]) for f in existing_files if f.split(".")[0].isdigit()]
            next_number = max(existing_numbers, default=0) + 1  # Find the next available number

            output_path = os.path.join(user_folder, f"{next_number}.jpg")

            # Save new detected image without overwriting
            results[0].save(output_path)  # Save the annotated image

            # Cleanup temporary file
            os.remove(temp_path)

            return {
                "counts": class_counts,
                "total_objects": len(detections),
                "detections": detections,
                "saved_image": output_path
            }, 200
        
    class DetectPlantDisease(Resource):
        def post(self):
            # Check for API token in headers
            api_token = request.headers.get('Authorization')

            if not api_token:
                return {"message": "Missing required parameters"}, 400

            # Validate user token
            user = User.query.filter_by(auth_token=api_token).first()

            if not user:
                return {"message": "Invalid or missing API token"}, 401

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

            # Define output directory structure
            base_folder = "Detection images"
            plant_disease_folder = os.path.join(base_folder, "plant-disease", api_token)  # Unique folder for each user

            if not os.path.exists(plant_disease_folder):
                os.makedirs(plant_disease_folder)

            # Generate the next available image number
            existing_files = [f for f in os.listdir(plant_disease_folder) if f.endswith(".jpg")]
            existing_numbers = [int(f.split(".")[0]) for f in existing_files if f.split(".")[0].isdigit()]
            next_number = max(existing_numbers, default=0) + 1  # Find the next available number

            output_path = os.path.join(plant_disease_folder, f"{next_number}.jpg")

            # Save new detected image without overwriting
            results[0].save(output_path)  # Save the annotated image

            # Cleanup temporary file
            os.remove(temp_path)

            # Return JSON response
            return {
                "counts": class_counts,
                "total_diseases_detected": len(detections),
                "detections": detections,
                "saved_image": output_path
            }, 200

    class DetectObjectsBase64(Resource):
        def post(self):
            data = request.get_json()
            image_base64 = data.get("image_base64")
            api_token = request.headers.get("Authorization")

            if not image_base64 or not api_token:
                return {"error": "Missing required parameters"}, 400

            # Verify API token
            user = User.query.filter_by(auth_token=api_token).first()
            if not user:
                return {"error": "Invalid or missing API token"}, 401

            try:
                # Decode base64 image
                image_data = base64.b64decode(image_base64)
                image = Image.open(BytesIO(image_data))

                # Save image temporarily
                temp_path = os.path.join(tempfile.gettempdir(), "temp_image.jpg")
                image.save(temp_path)

                # Run YOLO model prediction
                results = model.predict(source=temp_path)

                detections = []
                class_counts = {}

                for result in results:
                    if hasattr(result, "boxes"):
                        for box in result.boxes:
                            class_name = model.names[int(box.cls)]
                            confidence = float(box.conf)

                            # Store detection details
                            detections.append({
                                "class": class_name,
                                "confidence": round(confidence, 4)
                            })

                            # Count occurrences of each class
                            class_counts[class_name] = class_counts.get(class_name, 0) + 1

                # Define output folder structure
                base_folder = "Detection images"
                sub_folder = "object-detection"
                user_folder = os.path.join(base_folder, sub_folder, api_token)  # User-specific folder

                if not os.path.exists(user_folder):
                    os.makedirs(user_folder)

                # Generate the next available image number
                existing_files = [f for f in os.listdir(user_folder) if f.endswith(".jpg")]
                existing_numbers = [int(f.split(".")[0]) for f in existing_files if f.split(".")[0].isdigit()]
                next_number = max(existing_numbers, default=0) + 1  # Find the next available number

                output_path = os.path.join(user_folder, f"{next_number}.jpg")

                # Save new detected image
                results[0].save(output_path)  # Save the annotated image

                # Cleanup the temporary file
                os.remove(temp_path)

                return {
                    "counts": class_counts,
                    "total_objects": len(detections),
                    "detections": detections,
                    "saved_image": output_path
                }, 200

            except Exception as e:
                return {"error": str(e)}, 500
            
    class DetectPlantDiseaseBase64(Resource):
        def post(self):
            # Check for API token in headers
            api_token = request.headers.get('Authorization')

            if not api_token:
                return {"message": "Missing required parameters"}, 400

            # Validate user token
            user = User.query.filter_by(auth_token=api_token).first()

            if not user:
                return {"message": "Invalid or missing API token"}, 401

            data = request.get_json()
            image_base64 = data.get("image_base64")

            if not image_base64:
                return {"error": "No base64 image provided"}, 400

            try:
                # Decode base64 image
                image_data = base64.b64decode(image_base64)
                image = Image.open(BytesIO(image_data))

                # Save image temporarily
                temp_path = os.path.join(tempfile.gettempdir(), "temp_image.jpg")
                image.save(temp_path)

                # Run YOLO Model Prediction
                results = model_1.predict(source=temp_path)

                detections = []
                class_counts = {}

                for result in results:
                    if hasattr(result, 'boxes'):
                        for box in result.boxes:
                            class_name = model_1.names[int(box.cls)]
                            confidence = float(box.conf)

                            # Store detection details
                            detections.append({
                                'class': class_name,
                                'confidence': round(confidence, 4)
                            })

                            # Count occurrences of each class
                            class_counts[class_name] = class_counts.get(class_name, 0) + 1

                # Define output directory structure
                base_folder = "Detection images"
                plant_disease_folder = os.path.join(base_folder, "plant-disease", api_token)  # Unique folder for each user

                if not os.path.exists(plant_disease_folder):
                    os.makedirs(plant_disease_folder)

                # Generate the next available image number
                existing_files = [f for f in os.listdir(plant_disease_folder) if f.endswith(".jpg")]
                existing_numbers = [int(f.split(".")[0]) for f in existing_files if f.split(".")[0].isdigit()]
                next_number = max(existing_numbers, default=0) + 1  # Find the next available number

                output_path = os.path.join(plant_disease_folder, f"{next_number}.jpg")

                # Save new detected image without overwriting
                results[0].save(output_path)  # Save the annotated image

                # Cleanup temporary file
                os.remove(temp_path)

                return {
                    "counts": class_counts,
                    "total_diseases_detected": len(detections),
                    "detections": detections,
                    "saved_image": output_path
                }, 200
            except Exception as e:
                return {"error": str(e)}, 500
    class FetchObjectDetectionImages(Resource):
        def get(self):
            api_token = request.headers.get("Authorization")

            if not api_token:
                return {"error": "Missing API token"}, 400

            user = User.query.filter_by(auth_token=api_token).first()
            if not user:
                return {"error": "Invalid API token"}, 401

            object_detection_path = os.path.join(BASE_FOLDER, "object-detection", api_token)

            if not os.path.exists(object_detection_path):
                return {"object_detection_images": []}, 200

            images = [
                request.host_url + "get-image/object-detection/" + api_token + "/" + file
                for file in os.listdir(object_detection_path) if file.endswith(".jpg")
            ]

            return {"object_detection_images": images}, 200


    class FetchPlantDiseaseImages(Resource):
        def get(self):
            api_token = request.headers.get("Authorization")

            if not api_token:
                return {"error": "Missing API token"}, 400

            user = User.query.filter_by(auth_token=api_token).first()
            if not user:
                return {"error": "Invalid API token"}, 401

            plant_disease_path = os.path.join(BASE_FOLDER, "plant-disease", api_token)

            if not os.path.exists(plant_disease_path):
                return {"plant_disease_images": []}, 200

            images = [
                request.host_url + "get-image/plant-disease/" + api_token + "/" + file
                for file in os.listdir(plant_disease_path) if file.endswith(".jpg")
            ]

            return {"plant_disease_images": images}, 200


    class GetImage(Resource):
        def get(self, category, api_token, filename):
            image_folder = os.path.join(BASE_FOLDER, category, api_token)
            return send_from_directory(image_folder, filename)
                    
    class GetD1(Resource):
        def get(self, id):
            return get_latest_non_null(id, "D1")

    class GetD2(Resource):
        def get(self, id):
            return get_latest_non_null(id, "D2")

    class GetD3(Resource):
        def get(self, id):
            return get_latest_non_null(id, "D3")

    class GetD4(Resource):
        def get(self, id):
            return get_latest_non_null(id, "D4")

    class GetD5(Resource):
        def get(self, id):
            return get_latest_non_null(id, "D5")

    class GetD6(Resource):
        def get(self, id):
            return get_latest_non_null(id, "D6")

    class GetD7(Resource):
        def get(self, id):
            return get_latest_non_null(id, "D7")

    class GetD8(Resource):
        def get(self, id):
            return get_latest_non_null(id, "D8")

    
    api.add_resource(GetD1, "/get_d1/<int:id>")
    api.add_resource(GetD2, "/get_d2/<int:id>")
    api.add_resource(GetD3, "/get_d3/<int:id>")
    api.add_resource(GetD4, "/get_d4/<int:id>")
    api.add_resource(GetD5, "/get_d5/<int:id>")
    api.add_resource(GetD6, "/get_d6/<int:id>")
    api.add_resource(GetD7, "/get_d7/<int:id>")
    api.add_resource(GetD8, "/get_d8/<int:id>")
    api.add_resource(GetData, "/get_data/<int:id>")
    api.add_resource(UpdateData, '/update')
    api.add_resource(detect_objects, '/detect_objects')
    api.add_resource(DetectPlantDisease, "/detect_plant_disease")
    api.add_resource(DetectObjectsBase64, '/detect_objects_base64')
    api.add_resource(DetectPlantDiseaseBase64, '/detect_plant_disease_base64')
    api.add_resource(FetchObjectDetectionImages, '/fetch_object_detection_images')
    api.add_resource(FetchPlantDiseaseImages, '/fetch_plant_disease_images')




    return api
