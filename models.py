from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(500), default="", nullable=False)
    complete = db.Column(db.Boolean, default=False, nullable=False)

    @property
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "complete": self.complete
        }
