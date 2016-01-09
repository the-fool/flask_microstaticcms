import json
from flask import Blueprint, Response
from flask.ext.login import login_required
from app.models import Tire

bp = Blueprint('products', __name__, url_prefix='/products')

@bp.route('/')
def products():
    tires = [t.to_json() for t in Tire.query.all()]
    return Response(json.dumps(tires), mimetype='application/json')

