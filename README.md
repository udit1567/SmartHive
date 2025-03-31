# Smart Hive

## Overview
Smart Hive is a **full-stack IoT-based environmental monitoring and AI-powered surveillance system**. It integrates **Python Flask** with **Flask-RESTful for APIs**, **YOLOv8 for object detection**, and a **React-based frontend** for storing and visualizing data. The system allows users to **securely log in and monitor their farms, soil moisture levels, and surveillance cameras**.

## Features
### 🔐 Secure Authentication & User Management
- **Complete authentication system** with user-specific monitoring
- **Role-based access** ensures each user can only view their own data
- **JWT-based security** for API communication

### 🌍 Environmental Monitoring
- **Soil Moisture Monitoring** – ESP-12F with a soil moisture sensor, powered by a solar panel
- **Air Quality Monitoring** – ESP32 with an MQ-135 sensor for AQI measurement
- **Temperature & Humidity Monitoring** – ESP32 with a DHT11 sensor

### 📷 AI-Powered Surveillance
- **ESP32-CAM for real-time object detection** using YOLOv8
- **Stores detected images and video feeds**
- **Fetches surveillance images via APIs**
- **Detects plant diseases using a trained model**

### 🌐 Full-Stack Architecture
#### Backend (Python + Flask + Flask-RESTful)
- **Flask Framework** with RESTful APIs
- **YOLOv8 Object Detection** integrated with the backend
- **SQLite3 Database** for secure data storage
- **Flask-RESTful API Endpoints:**
  ```python
  api.add_resource(GetD1, "/get_d1/<int:id>")
  api.add_resource(GetD2, "/get_d2/<int:id>")
  api.add_resource(GetD3, "/get_d3/<int:id>")
  api.add_resource(GetD4, "/get_d4/<int:id>")
  api.add_resource(GetD5, "/get_d5/<int:id>")
  api.add_resource(GetD6, "/get_d6/<int:id>")
  api.add_resource(GetD7, "/get_d7/<int:id>")
  api.add_resource(GetD8, "/get_d8/<int:id>")
  api.add_resource(GetData, "/get_data/<int:id>")
  api.add_resource(OTAUpdate, "/ota/latest")
  api.add_resource(OTADownload, "/ota/download")
  api.add_resource(UpdateData, '/update')
  api.add_resource(detect_objects, '/detect_objects')
  api.add_resource(DetectPlantDisease, "/detect_plant_disease")
  api.add_resource(DetectObjectsBase64, '/detect_objects_base64')
  api.add_resource(DetectPlantDiseaseBase64, '/detect_plant_disease_base64')
  api.add_resource(FetchObjectDetectionImages, '/fetch_object_detection_images')
  api.add_resource(FetchPlantDiseaseImages, '/fetch_plant_disease_images')
  ```

#### Frontend (React + REST APIs)
- **React-based UI** for data visualization and user management
- **Dashboard to display sensor data and detected objects**
- **Interactive charts and real-time updates**
- **Secure login system**

## Database (SQLite3)
- Stores **user credentials, sensor data, and detected images**
- **Optimized queries** for real-time data retrieval

## Installation & Setup
### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/smarthive.git
cd smarthive
```

### 2. Backend Setup
```sh
pip install -r requirements.txt
python app.py
```

### 3. Frontend Setup
```sh
cd frontend
npm install
npm start
```

### 4. Access the Dashboard
- Open `http://localhost:3000/`
- Log in with your credentials

## API Documentation
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/get_d1/<int:id>` | GET | Fetches data from sensor D1 |
| `/get_d2/<int:id>` | GET | Fetches data from sensor D2 |
| `/get_data/<int:id>` | GET | Retrieves all sensor data |
| `/detect_objects` | POST | Runs YOLOv8 object detection |
| `/fetch_object_detection_images` | GET | Fetches saved images from object detection |

## 📷 UI & API Screenshots
![Screenshot 2025-02-28 191448](https://github.com/user-attachments/assets/1141a387-eba8-4b5c-aa37-fca5f2189719)
![Screenshot 2025-02-28 190741](https://github.com/user-attachments/assets/6dd7d095-3910-429c-ae67-348d3cd7ee44)
![Screenshot 2025-02-28 190754](https://github.com/user-attachments/assets/aec17a0d-12f9-4fa5-9b77-8ec689fa3d1a)

![Screenshot 2025-02-28 190816](https://github.com/user-attachments/assets/2e90409a-296b-437b-9394-09a979f96f3e)
![Screenshot 2025-02-28 190849](https://github.com/user-attachments/assets/041f9bdb-cf8a-4b31-b53e-cdc083c4f001)


## Future Enhancements
- ☁️ **Cloud-based Dashboard** for remote access
- 📡 **LoRa/Wi-Fi Mesh Networking** for extended range
- 🔋 **Battery Optimization** for longer uptime

## Contributing
Pull requests are welcome! Feel free to submit an issue or PR.

## License
This project is licensed under the **MIT License**.

---
Made with ❤️ by [Your Name]
