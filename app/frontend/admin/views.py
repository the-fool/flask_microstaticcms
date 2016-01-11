import os
from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask.ext.login import login_required, login_user, logout_user, current_user
from werkzeug import secure_filename
from . import admin
from .forms import LoginForm, NewTireForm, UpdateImageForm
from app.models import User, Tire
from app.database import db_session as sess

@admin.route('/', methods=['GET', 'POST'])
@login_required
def cpanel():
    form = NewTireForm()
    img_form = UpdateImageForm()
    if form.validate_on_submit():
        tire = Tire(name = form.name.data,
                   price = form.price.data,
                   size = form.size.data,
                   status = Tire.Status.available.name,
                   description = form.description.data,
                   quantity = form.quantity.data)
        if form.image.data is not None:
            tire.image = save_image(form)
        sess.add(tire)
        sess.commit()
        flash('Added {0}'.format(form.name.data))
        return redirect(url_for('.cpanel'))
    elif img_form.validate_on_submit():
        t = Tire.query.filter_by(id=img_form.pk.data).first()
        t.image = save_image(form)
        sess.commit()
        flash('Updated image')
        return redirect(url_for('.cpanel'))
    elif request.method == 'POST':
        flash(form.errors)
    return render_template('admin.html', form=form, img_form=img_form)


@admin.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        print user
        if user is not None and user.verify_password(form.password.data):
            login_user(user)
            return redirect(url_for('.cpanel'))
        flash('Invalid username or password. Or both.')
    return render_template('login.html', form=form)
 
    
@admin.route('/logout')
def logout():
    logout_user()
    flash('You have been logged out.')
    return redirect(url_for('main.index'))


import hashlib
import time
def save_image(form):
    fname = secure_filename(form.image.data.filename)
    ext = os.path.splitext(fname)[1]
    h = hashlib.sha1()
    h.update(str(time.time()))
    fname = str(h.hexdigest()) + ext 
    form.image.data.save('app/frontend/static/img/' + fname)
    return fname
    