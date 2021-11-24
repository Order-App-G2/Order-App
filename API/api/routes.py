from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from api import app
from api.models import *


@app.route('/')
def hello():
    return jsonify({'hello': 'world'})


@app.route('/login')
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Not verified', 401, {'WWW-Authenticate': ' Basic realm="Login required!" '})

    user = User.query.filter_by(username=auth.username).first()

    if not user:
        return make_response('Not verified', 401, {'WWW-Authenticate': ' Basic realm="Login required!" '})

    if check_password_hash(user.password, auth.password):
        exp = datetime.datetime.utcnow() + datetime.timedelta(minutes=10)
        token = jwt.encode({'public_id': user.public_id, 'exp': exp}, app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({'token': token})

    return make_response('Not verified', 401, {'WWW-Authenticate': ' Basic realm="Login required!" '})


# create non admin user
@app.route('/createUser', methods=['POST'])
def create_user():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    username = data['username']
    password = data['password']
    email = data['email']

    new_user = User(public_id=str(uuid.uuid4()),
                    email=email,
                    username=username,
                    password=hashed_password,
                    user_role_id=1)

    if not username or not password:
        return jsonify({"message": "parameter must be filled"}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'username is already taken '}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'email is already taken '}), 400
    else:
        db.session.add(new_user)
        db.session.commit()

    return jsonify({'message': 'new user has been created'})


# create admin account
@app.route('/createAdmin', methods=['POST'])
def create_admin():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    username = data['username']
    password = data['password']
    email = data['email']

    new_user = User(public_id=str(uuid.uuid4()), email=email, username=username, password=hashed_password,
                    user_role_id=2)
    if not username or not password:
        return jsonify({"message": "parameter must be filled"}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'username is already taken '}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'email is already taken '}), 400
    else:
        db.session.add(new_user)
        db.session.commit()

    return jsonify({'message': 'new admin has been created'})


# get all users and their role
@app.route('/user', methods=['GET'])
def get_all_users():
    q = db.session.query(User.username,
                         User.email,
                         Roles.role,
                         User.public_id
                         ).join(Roles, User.user_role_id == Roles.id).all()
    output = []
    for user in q:
        user_data = {
            'username': user.username,
            'email': user.email,
            'public_id': user.public_id,
            'role': user.role
        }

        output.append(user_data)
    return jsonify({'users': output})


@app.route('/user/<public_id>', methods=['GET'])
def get_one_user(public_id):
    q = db.session.query(User.username,
                         User.email,
                         User.public_id,
                         Roles.role,
                         ).join(Roles, User.user_role_id == Roles.id). \
        filter(User.public_id == public_id).first()

    if not q:
        return jsonify({'message': 'no user found '})

    user_data = {'public_id': q.public_id,
                 'name': q.username,
                 'role': q.role}
    return jsonify({'user': user_data})


# delete user
@app.route('/user/<public_id>', methods=['DELETE'])
def delete_user(public_id):
    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': 'No user found!'})

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'user has been deleted'})


# edit user info
@app.route('/user/<string:public_id>', methods=['PUT'])
def edit_user(public_id):
    pass


@app.route('/deleteProduct/<int:id>', methods=['DELETE'])
def delete_Product(id):
    product = Product.query.filter_by(id=id).first()

    if not product:
        return jsonify({'message': 'No product found!'})

    db.session.delete(product)
    db.session.commit()

    return jsonify({'message': 'product has been deleted'})


# gets all product(non auth needed)
@app.route('/home', methods=['GET'])
def get_all_products():
    products = Product.query.all()

    output = []
    for product in products:
        product_data = {'title': product.title, 'content': product.content}
        output.append(product_data)

    return jsonify({'product': output})


# need to fix this after we have auth function
# add new product
@app.route('/addProduct', methods=['POST'])
def new_product():
    data = request.get_json()
    title = data['title']
    content = data['content']
    user_id = data['user_id']
    price = data['price']
    category = data['category']

    if not title or not content or not user_id:
        return jsonify({'message': 'all parameters must be filled'})
    else:
        product = Product(title=title, content=content, price=price, user_id=user_id, product_category_id=category)
        db.session.add(product)
        db.session.commit()
        return jsonify({'message': 'new product has been created'})


@app.route('/productCategory/<int:category>', methods=['GET'])
def get_product_by_category(category):
    q = db.session.query(Product.title,
                         Product.content,
                         Product.price,
                         Category.name
                         ).join(Category, Product.product_category_id == Category.id).filter(Category.id == category).all()
    output = []
    for product in q:
        user_data = {
            'title': product.title,
            'content': product.content,
            'price': product.price,
            'category': product.name
        }

        output.append(user_data)
    return jsonify({'products': output})


@app.route('/ownerProducts/<string:public_id>', methods=['GET'])
def get_all_product_by_owner(public_id):
    user = db.session.query(Roles.role).join(User, Roles.id == User.user_role_id).filter(User.public_id == public_id).first()

    if user.role == 'admin':
        q = db.session.query(
                             User.username,
                             Product.title,
                             Product.content,
                             Product.price,
                             ).join(User, Product.user_id == User.public_id).filter(
            Product.user_id == public_id).all()

        if not q:
            return jsonify({'message': 'no user found '})
        output = []

        for product in q:
            user_data = {
                'title': product.title,
                'content': product.content,
                'price': product.price,
            }

            output.append(user_data)
        return jsonify({'product': output})
    else:
        return jsonify({'message': 'this user is a customer'})
