from models import Task
from app import ma


class TaskSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Task
    id = ma.auto_field()
    title = ma.auto_field()
    description = ma.auto_field()
    complete = ma.auto_field()
