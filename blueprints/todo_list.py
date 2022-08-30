from flask import (
    Blueprint,
    redirect,
    url_for,
    request,
    render_template
)

from models import db, ToDoItem

todo_list_api = Blueprint("todo_list_api", __name__)


@todo_list_api.route("/", methods=["GET"])
def todo_list():
    todo_list = ToDoItem.query.all()
    return render_template("base.html", todo_list=todo_list)


@todo_list_api.route("/complete", methods=["GET"])
def todo_list_complete():
    todo_list = ToDoItem.query.filter_by(complete=True).all()
    return render_template("base.html", todo_list=todo_list)


@todo_list_api.route("/uncomplete", methods=["GET"])
def todo_list_uncomplete():
    todo_list = ToDoItem.query.filter_by(complete=False).all()
    return render_template("base.html", todo_list=todo_list)


@todo_list_api.route("/add", methods=["POST"])
def add():
    title = request.form.get("title")
    new_todo = ToDoItem(title=title, complete=False)
    db.session.add(new_todo)
    db.session.commit()

    return redirect("/")


@todo_list_api.route("/update/<int:todo_id>")
def update(todo_id):
    todo = ToDoItem.query.filter_by(id=todo_id).first()
    todo.complete = not todo.complete
    db.session.commit()

    return redirect("/")


@todo_list_api.route("/delete/<int:todo_id>")
def delete(todo_id):
    todo = ToDoItem.query.filter_by(id=todo_id).first()
    db.session.delete(todo)
    db.session.commit()
    return redirect("/")

# TODO filtrar completed/uncompleted, subtasks
