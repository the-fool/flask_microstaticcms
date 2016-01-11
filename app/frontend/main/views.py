from . import main
from flask import render_template
from app.models import Tire

@main.route('/')
def index():
    tires = Tire.query.all()
    return render_template('index.html', tires=tires)
