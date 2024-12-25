from flask import Flask
from app.api import initialize_api
from app.models import db
from flask_cors import CORS
app = None

def create_app():
    app = Flask(__name__)
    app.debug = True
    api = initialize_api(app)
    app.secret_key = "secret_fhfgh"
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///hsp.sqlite3"
    db.init_app(app)
    CORS(app)
    app.app_context().push()

    return app



app = create_app()

from app.routes import *
app.add_url_rule('/login', 'login', login, methods=['POST'])
app.add_url_rule('/signup', 'signup', signup, methods=['POST'])



if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')

