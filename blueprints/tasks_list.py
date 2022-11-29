from flask import (
    Blueprint,
    redirect,
    url_for,
    request,
    render_template,
    make_response
)
from flask_marshmallow import exceptions

from schemas import TaskSchema
from models import db, Task
from forms import CreateTaskForm ,EditTaskForm, QuickCreateTaskForm

tasks_list_api = Blueprint("tasks_list_api", __name__)

def get_tasks_forms(tasks_list):
    # tasks_forms = {}
    # for task in tasks_list:
    #     tasks_forms[task.id] = EditTaskForm(obj=task)
    return {task.id: EditTaskForm(obj=task) for task in tasks_list}

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
    tasks_forms = get_tasks_forms(tasks_list)
    task_form = CreateTaskForm()
    quick_create_task_form = QuickCreateTaskForm()
    return render_template(
        "base.html",
        tasks_list=tasks_list,
        tasks_forms=tasks_forms,
        task_form=task_form,
        quick_create_task_form=quick_create_task_form)

@tasks_list_api.route("/tasks/<int:task_id>", methods=["GET"])
def get_task(task_id):
    task = Task.query.filter_by(id=task_id).first()
    task_form = EditTaskForm(obj=task)
    return render_template("includes/edit_modal.html", task=task, task_form=task_form)

@tasks_list_api.route("/tasks/filter/<filter_by>", methods=["GET"])
def tasks_filter(filter_by):
    import ipdb; ipdb.set_trace()
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

    return redirect("/")

@tasks_list_api.route("/tasks/update/<int:task_id>", methods=["POST"])
def update_task(task_id):

    try:
        schema = TaskSchema()
        task_from_request = schema.load(request.json)
    except exceptions.ValidationError as err:
        return make_response({"status_code": 400, "message": err.messages})
    task = Task.query.filter_by(id=task_id).update(task_from_request)
    db.session.commit()

    return redirect(request.referrer)

# @tasks_list_api.route("/tasks/update/<int:task_id>", methods=["GET", "POST"])
# def update(task_id):
#     form = EditTaskForm()
#     import ipdb; ipdb.set_trace()
#     if form.validate_on_submit():
#         task = Task.query.filter_by(id=task_id).first()
#         task.complete = not task.complete
#         db.session.commit()

#         return redirect("/")
#     # return redirect(url_for("tasks_list_api.tasks_list", task_form=form, show_edit_modal=True))
#     # tasks_list = Task.query.all()
#     # tasks_forms = get_tasks_forms(tasks_list)
#     # return render_template("base.html", tasks_list=tasks_list, tasks_forms=tasks_forms)
#     return redirect("/")


@tasks_list_api.route("/tasks/delete/<int:task_id>")
def delete(task_id):
    task = Task.query.filter_by(id=task_id).first()
    db.session.delete(task)
    db.session.commit()
    return redirect("/")

# TODO filtrar completed/uncompleted, subtasks
