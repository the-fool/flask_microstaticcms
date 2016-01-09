from flask.ext.wtf import Form
from wtforms import DecimalField, FileField, StringField, TextAreaField, PasswordField, SubmitField
from wtforms.validators import Required, Length, Email

from app.models import User

class LoginForm(Form):
    email = StringField('Email', validators=[Required(), Length(1, 64), Email()])
    password = PasswordField('Password', validators=[Required()])
    submit = SubmitField('Log In')
    
class NewTireForm(Form):
    name = StringField('Name', validators=[Required()])
    price = DecimalField('Price', validators=[Required()])
    size = StringField('Size')
    description = TextAreaField('Tire Description')
    image = FileField('Image File')
