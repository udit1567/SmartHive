from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

# Initialize database
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.debug = True
    app.secret_key = "secret_key"
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///hsp.sqlite3"
    db.init_app(app)
    app.app_context().push()

    return app

app = create_app()

# Import models
class Device(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"<Device {self.name}>"

class Data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    device_id = db.Column(db.Integer, db.ForeignKey('device.id'), nullable=False)
    temperature = db.Column(db.Float, nullable=False)
    humidity = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=db.func.now())

    def __repr__(self):
        return f"<Data Device:{self.device_id} Temp:{self.temperature} Hum:{self.humidity}>"

# API key for security
API_KEY = "5588"

@app.route('/')
def index():
    return welcome to our home automation site

@app.route('/register_device', methods=['GET'])
def register_device():
    """Endpoint to register a new device using URL parameters."""
    api_key = request.args.get('API-Key')
    if api_key != API_KEY:
        return jsonify({"error": "Unauthorized"}), 403

    device_name = request.args.get('device_name')
    if not device_name:
        return jsonify({"error": "Device name is required"}), 400

    new_device = Device(name=device_name)
    db.session.add(new_device)
    db.session.commit()
    return jsonify({"message": "Device registered successfully!", "device_id": new_device.id})

@app.route('/update_data', methods=['GET'])
def update_data():
    """Endpoint to update temperature and humidity data for a device using its name."""
    api_key = request.args.get('API-Key')
    if api_key != API_KEY:
        return jsonify({"error": "Unauthorized"}), 403

    device_name = request.args.get('device_name')
    temperature = request.args.get('temperature')
    humidity = request.args.get('humidity')

    if not all([device_name, temperature, humidity]):
        return jsonify({"error": "All fields (device_name, temperature, humidity) are required"}), 400

    try:
        temperature = float(temperature)
        humidity = float(humidity)
    except ValueError:
        return jsonify({"error": "Invalid data format"}), 400

    # Find the device by name
    device = Device.query.filter_by(name=device_name).first()
    if not device:
        return jsonify({"error": "Device not found"}), 404

    # Insert new data for the found device
    new_data = Data(device_id=device.id, temperature=temperature, humidity=humidity)
    db.session.add(new_data)
    db.session.commit()

    return jsonify({"message": f"Data updated successfully for device {device.name}!"})


@app.route('/get_data', methods=['GET'])
def get_data():
    """Retrieve the data for a specific device using URL parameters."""
    device_id = request.args.get('device_id')
    if not device_id:
        return jsonify({"error": "Device ID is required"}), 400

    try:
        device_id = int(device_id)
    except ValueError:
        return jsonify({"error": "Invalid device ID format"}), 400

    device = Device.query.get(device_id)
    if not device:
        return jsonify({"error": "Device not found"}), 404

    data = Data.query.filter_by(device_id=device_id).all()
    data_list = [{"temperature": d.temperature, "humidity": d.humidity, "timestamp": d.timestamp} for d in data]
    return jsonify({"device_name": device.name, "data": data_list})

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True,host = '0.0.0.0')
