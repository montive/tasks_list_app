from socket import IP_DROP_MEMBERSHIP
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import db


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)

    from blueprints.todo_list import todo_list_api
    app.register_blueprint(todo_list_api)
    return app
