from flask import Flask
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity,unset_jwt_cookies,jwt_required,JWTManager
from app.api import initialize_api
from app.models import db
from flask_cors import CORS
from datetime import datetime,timedelta,timezone



def create_app():
    app = Flask(__name__)
    app.debug = True

    app.secret_key = "secret_Smart_Hive"
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
    app.config["JWT_SECRET_KEY"] = "fhfghfgjhfgjfgh"
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///build.sqlite3"
    app.config['SQLALCHEMY_ECHO'] = False
    jwt = JWTManager(app)
    
    
    db.init_app(app)
    CORS(app)

    initialize_api(app)

    app.app_context().push()

    return app

app = create_app()

from app.routes import *
app.register_blueprint(main)



app.add_url_rule('/login', 'login', login, methods=['POST'])
app.add_url_rule('/signup', 'signup', signup, methods=['POST'])


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')