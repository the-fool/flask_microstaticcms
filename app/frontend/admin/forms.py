from flask.ext.wtf import Form
from wtforms import DecimalField, FileField, HiddenField, StringField, TextAreaField, PasswordField, SubmitField
from wtforms.validators import Required, Length, Email

from app.models import User

class LoginForm(Form):
    email = StringField('Email', validators=[Required(), Length(1, 64), Email()])
    password = PasswordField('Password', validators=[Required()])
    submit = SubmitField('Log In')
    
class NewTireForm(Form):
    name = StringField('Name', validators=[Required()])
    price = DecimalField('Price (no $ sign)', validators=[Required()])
    size = StringField('Size')
    description = TextAreaField('Tire Description')
    image = FileField('Image File')
    submit = SubmitField('Create New Tire')
    
class UpdateImageForm(Form):
    image = FileField('Image File (.png plz)', validators=[Required()])
    pk = HiddenField('pk')
    submit = SubmitField('Update Image')