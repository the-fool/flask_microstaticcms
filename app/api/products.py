import json
from flask import Blueprint, request, Response
from flask.ext.login import login_required
from app.models import Tire
from app.database import db_session as sess

bp = Blueprint('products', __name__, url_prefix='/products')

@bp.route('/')
def products():
    i = request.args.get('id','')
    if i:
        t = Tire.query.filter_by(id=i).first().to_json()
    else:
        t = [t.to_json() for t in Tire.query.all()]
    return Response(json.dumps(t), mimetype='application/json')


@bp.route('/statuses')
def statuses():
    l = []
    for name, member in Tire.Status.__members__.items():
        l.append(dict([('value', name),('text',name)]))
    return Response(json.dumps(l), mimetype='application/json')

@bp.route('/update/<col>', methods=['POST'])
@login_required
def update(col):
    t = Tire.query.filter_by(id = int(request.form['pk'])).first()
    v = request.form['value']
    setattr(t, col, v)
    sess.commit()
    return Response(status=200)

@bp.route('/delete', methods=['POST'])
@login_required
def delete():
    try:
        data = request.get_json()['ids']
        ts = Tire.query.filter(Tire.id.in_(data))
        for t in ts:
            sess.delete(t)
        sess.commit()
    except:
        return Response(status=503)
    
    return Response(status=200)