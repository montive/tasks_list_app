from flask import (
    Blueprint,
    redirect,
    url_for,
    request,
    render_template
)

from models import db, Task

tasks_list_api = Blueprint("tasks_list_api", __name__)


@tasks_list_api.route("/", methods=["GET"])
def tasks_list():
    tasks_list = Task.query.all()
    return render_template("base.html", tasks_list=tasks_list)


@tasks_list_api.route("/complete", methods=["GET"])
def tasks_list_complete():
    tasks_list = Task.query.filter_by(complete=True).all()
    return render_template("base.html", tasks_list=tasks_list)


@tasks_list_api.route("/uncomplete", methods=["GET"])
def tasks_list_uncomplete():
    tasks_list = Task.query.filter_by(complete=False).all()
    return render_template("base.html", tasks_list=tasks_list)


@tasks_list_api.route("/add", methods=["POST"])
def add():
    title = request.form.get("title")
    new_task = Task(title=title, complete=False)
    db.session.add(new_task)
    db.session.commit()

    return redirect("/")


@tasks_list_api.route("/update/<int:task_id>")
def update(task_id):
    task = Task.query.filter_by(id=task_id).first()
    task.complete = not task.complete
    db.session.commit()

    return redirect("/")


@tasks_list_api.route("/delete/<int:task_id>")
def delete(task_id):
    task = Task.query.filter_by(id=task_id).first()
    db.session.delete(task)
    db.session.commit()
    return redirect("/")

# TODO filtrar completed/uncompleted, subtasks
