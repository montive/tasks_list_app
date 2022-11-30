import os
from flask import Flask
from models import db
from flask_marshmallow import Marshmallow


ma = Marshmallow()


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config['SECRET_KEY'] = os.urandom(32)
    db.init_app(app)
    ma = Marshmallow(app)

    from blueprints.tasks_list import tasks_list_api
    app.register_blueprint(tasks_list_api)
    return app
