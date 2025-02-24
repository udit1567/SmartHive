from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    source = db.Column(db.String(255), nullable=True)
    auth_token = db.Column(db.String(64), unique=True, nullable=True)

class Data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, nullable=False, default=db.func.now())
    D1 = db.Column(db.Float, nullable=True) 
    D2 = db.Column(db.Float, nullable=True)
    D3 = db.Column(db.Float, nullable=True)
    D4 = db.Column(db.Float, nullable=True)
    D5 = db.Column(db.Float, nullable=True)
    D6 = db.Column(db.Float, nullable=True)
    D7 = db.Column(db.Float, nullable=True)
    D8 = db.Column(db.Float, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('data', lazy=True, cascade="all, delete-orphan"))

    def to_dict(self):
        return {
            "id": self.id,
            "timestamp": self.timestamp.strftime("%Y-%m-%d %H:%M"),
            "D1": self.D1,
            "D2": self.D2,
            "D3": self.D3,
            "D4": self.D4,
            "D5": self.D5,
            "D6": self.D6,
            "D7": self.D7,
            "D8": self.D8,
            "user_id": self.user_id
        }
