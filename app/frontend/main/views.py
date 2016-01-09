from . import main
from flask import render_template
#from app.models import *

@main.route('/')
def index():
    return render_template('index.html')
