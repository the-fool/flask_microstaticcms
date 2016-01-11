from flask.ext.wtf import Form
from wtforms import DecimalField, FileField, HiddenField, IntegerField, StringField, TextAreaField, PasswordField, SubmitField
from wtforms.validators import Required, Length, Email, ValidationError

from app.models import User

def non_negative(form, field):
        if str(int(field.data)) == str(field.data) and int(field.data) >= 0:
            return
        else:
            raise ValidationError('Quantity must be non-negative integer')
        
class LoginForm(Form):
    email = StringField('Email', validators=[Required(), Length(1, 64), Email()])
    password = PasswordField('Password', validators=[Required()])
    submit = SubmitField('Log In')
    
class NewTireForm(Form):
    name = StringField('Name', validators=[Required()])
    price = DecimalField('Price (no $ sign)', validators=[Required()])
    size = StringField('Size')
    quantity = IntegerField('Quantity Available', validators=[Required(), non_negative])
    description = TextAreaField('Tire Description')
    image = FileField('Image File')
    submit = SubmitField('Create New Tire')
    
    
    
class UpdateImageForm(Form):
    image = FileField('Image File (.png plz)', validators=[Required()])
    pk = HiddenField('pk')
    submit = SubmitField('Update Image')
    
