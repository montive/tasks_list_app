from flask import (
    Blueprint,
    request,
    render_template,
    make_response
)
from flask_marshmallow import exceptions

from schemas import TaskSchema
from models import db, Task
from forms import EditTaskForm

tasks_list_api = Blueprint("tasks_list_api", __name__)


@tasks_list_api.route("/", methods=["GET"])
@tasks_list_api.route("/tasks", methods=["GET"])
def tasks_list():
    query_string = request.args.to_dict()
    try:
        schema = TaskSchema()
        query_string = schema.load(query_string, partial=True)
    except exceptions.ValidationError as err:
        return make_response({"status_code": 400, "message": {"query_string_error": err.messages}})

    tasks_list = Task.query.filter_by(**query_string).all()
    return make_response({
        "status_code": 200,
        "message": "OK",
        "tasks_list": [task.serialize for task in tasks_list]
    })


@tasks_list_api.route("/tasks/<int:task_id>", methods=["GET"])
def get_task(task_id):
    task = Task.query.filter_by(id=task_id).first()
    task_form = EditTaskForm(obj=task)
    return render_template("includes/edit_modal.html", task=task, task_form=task_form)


@tasks_list_api.route("/tasks/filter/<filter_by>", methods=["GET"])
def tasks_filter(filter_by):
    field_to_filter = request.get_json()
    tasks_list = Task.query.filter_by(**field_to_filter).all()

    return render_template("base.html", tasks_list=tasks_list)


@tasks_list_api.route("/tasks/complete", methods=["GET"])
def tasks_list_complete():
    tasks_list = Task.query.filter_by(complete=True).all()
    return render_template("base.html", tasks_list=tasks_list)


@tasks_list_api.route("/tasks/uncomplete", methods=["GET"])
def tasks_list_uncomplete():
    tasks_list = Task.query.filter_by(complete=False).all()
    return render_template("base.html", tasks_list=tasks_list)


@tasks_list_api.route("/tasks/add", methods=["POST"])
def add_task():
    try:
        schema = TaskSchema()
        task_from_request = schema.load(request.json)
    except exceptions.ValidationError as err:
        return make_response({"status_code": 400, "message": err.messages})
    title = request.form.get("title")
    new_task = Task(title=title, complete=False)
    db.session.add(new_task)
    db.session.commit()

    return make_response({"status_code": 201, "message": "Task created"})


@tasks_list_api.route("/tasks/update/<int:task_id>", methods=["POST"])
def update_task(task_id):

    try:
        schema = TaskSchema()
        task_from_request = schema.load(request.json)
    except exceptions.ValidationError as err:
        return make_response({"status_code": 400, "message": err.messages})
    task = Task.query.filter_by(id=task_id).update(task_from_request)
    db.session.commit()

    return make_response({"status_code": 200, "message": "OK"})


@tasks_list_api.route("/tasks/delete/<int:task_id>")
def delete(task_id):
    task = Task.query.filter_by(id=task_id).first()
    db.session.delete(task)
    db.session.commit()
    return make_response({"status_code": 200, "message": "OK"})

# TODO filtrar completed/uncompleted, subtasks
