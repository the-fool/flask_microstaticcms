import json
from flask import Blueprint, request, Response
from flask.ext.login import login_required
from app.models import Tire
from app.database import db_session as sess

bp = Blueprint('products', __name__, url_prefix='/products')

@bp.route('/')
def products():
    tires = [t.to_json() for t in Tire.query.all()]
    return Response(json.dumps(tires), mimetype='application/json')


@bp.route('/statuses')
def statuses():
    l = []
    for name, member in Tire.Status.__members__.items():
        l.append(dict([('value', name),('text',name)]))
    return Response(json.dumps(l), mimetype='application/json')

@bp.route('/update/<col>', methods=['POST'])
def update(col):
    t = Tire.query.filter_by(id = int(request.form['pk'])).first()
    v = request.form['value']
    setattr(t, col, v)
    sess.commit()
    return Response(status=200)