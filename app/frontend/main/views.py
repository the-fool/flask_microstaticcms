from flask import render_template
from sqlalchemy import or_

from . import main
from app.models import Tire

@main.route('/')
def index():
    tires = Tire.query.filter(or_(Tire.status == 'sold', 
                                  Tire.status == 'active'))
    return render_template('index.html', tires=tires)
