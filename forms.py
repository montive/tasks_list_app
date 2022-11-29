from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import Length, DataRequired
from wtforms.widgets import TextArea


class QuickCreateTaskForm(FlaskForm):
    title = StringField(label="Title", validators=[Length(min=2, max=80), DataRequired()])
    submit = SubmitField(label="Quick Add")


class CreateTaskForm(FlaskForm):
    title = StringField(label="Title", validators=[Length(min=2, max=80), DataRequired()])
    description = StringField(label="Description", validators=[Length(min=2, max=500)], widget=TextArea())
    complete = BooleanField(label="Completed", default=False)
    submit = SubmitField(label="Save changes")


class EditTaskForm(FlaskForm):
    title = StringField(label="Title", validators=[Length(min=2, max=80), DataRequired()])
    description = StringField(label="Description", validators=[Length(min=2, max=500)], widget=TextArea())
    complete = BooleanField(label="Completed", default=False)
    submit = SubmitField(label="Save changes")



