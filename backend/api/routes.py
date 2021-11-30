import uuid

import jwt
from api import app
from api.models import *
from flask import request, jsonify, make_response
from werkzeug.security import generate_password_hash, check_password_hash


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
@app.route('/createCustomer', methods=['POST'])
def create_customer():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    username = data['username']
    password = data['password']
    email = data['email']
    phoneNumber = data['phone_number']
    address = data['address']

    new_customer = Customer(public_id=str(uuid.uuid4()), email=email, username=username, password=hashed_password,
                            phoneNumber=phoneNumber, address=address)
    if not username or not password:
        return jsonify({"message": "parameter must be filled"}), 400
    if Customer.query.filter_by(username=username).first() or Partner.query.filter_by(
            username=username).first() or Courier.query.filter_by(username=username).first():
        return jsonify({'message': 'username is already taken '}), 400
    if Customer.query.filter_by(email=email).first() or Partner.query.filter_by(
            email=email).first() or Courier.query.filter_by(email=email).first():
        return jsonify({'message': 'email is already taken '}), 400
    else:
        db.session.add(new_customer)
        db.session.commit()

    return jsonify({'message': 'new customer has been created'})


# create admin account
@app.route('/createPartner', methods=['POST'])
def create_partner():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    username = data['username']
    password = data['password']
    email = data['email']

    new_user = Partner(public_id=str(uuid.uuid4()),
                       email=email, username=username, password=hashed_password)

    if not username or not password:
        return jsonify({"message": "parameter must be filled"}), 400
    if Customer.query.filter_by(username=username).first() or Partner.query.filter_by(
            username=username).first() or Courier.query.filter_by(username=username).first():
        return jsonify({'message': 'username is already taken '}), 400
    if Customer.query.filter_by(email=email).first() or Partner.query.filter_by(
            email=email).first() or Courier.query.filter_by(email=email).first():
        return jsonify({'message': 'email is already taken '}), 400
    else:
        db.session.add(new_user)
        db.session.commit()

    return jsonify({'message': 'new partner has been created'})


# create courier account
@app.route('/createCourier', methods=['POST'])
def create_courier():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    username = data['username']
    password = data['password']
    email = data['email']

    new_courier = Courier(public_id=str(uuid.uuid4()), email=email, username=username, password=hashed_password)

    if not username or not password:
        return jsonify({"message": "parameter must be filled"}), 400
    if Customer.query.filter_by(username=username).first() or Partner.query.filter_by(
            username=username).first() or Courier.query.filter_by(username=username).first():
        return jsonify({'message': 'username is already taken '}), 400
    if Customer.query.filter_by(email=email).first() or Partner.query.filter_by(
            email=email).first() or Courier.query.filter_by(email=email).first():
        return jsonify({'message': 'email is already taken '}), 400
    else:
        db.session.add(new_courier)
        db.session.commit()

    return jsonify({'message': 'new courier has been created'})

# get all users and their role
@app.route('/customer', methods=['GET'])
def get_all_users():
    q = db.session.query(Customer).all()

    output = []
    for customer in q:
        user_data = {
            'username': customer.username,
            'email': customer.email,
            'public_id': customer.public_id,
            'address': customer.address,
            'phone Number': customer.phoneNumber
        }

        output.append(user_data)
    return jsonify({'users': output})


@app.route('/getCourier', methods=['GET'])
def get_all_available_couriers():
    q = db.session.query(Courier).filter(Courier.available).all()

    output = []
    for courier in q:
        user_data = {
            'username': courier.username,
            'email': courier.email,
            'public_id': courier.public_id,
            'available': courier.available
        }

        output.append(user_data)
    return jsonify({'users': output})


@app.route('/changeCourier/<public_id>', methods=['PUT'])
def change_availability(public_id):
    courier = db.session.query(Courier).filter(public_id == public_id).first()

    if courier.available:
        courier.available = False

    else:
        courier.available = True

    db.session.commit()
    return jsonify({'courier': courier.available})


@app.route('/customer/<public_id>', methods=['GET'])
def get_one_user(public_id):
    q = db.session.query(Customer.username,
                         Customer.email,
                         Customer.public_id,
                         Customer.phoneNumber).filter(Customer.public_id == public_id).first()

    if not q:
        return jsonify({'message': 'no user found '})

    user_data = {'public_id': q.public_id,
                 'name': q.username,
                 'phone number': q.phoneNumber}
    return jsonify({'user': user_data})


# delete user
@app.route('/customer/<public_id>', methods=['DELETE'])
def delete_user(public_id):
    user = Customer.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': 'No user found!'})

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'user has been deleted'})


# edit user info
@app.route('/user/<string:public_id>', methods=['PUT'])
def edit_user(public_id):
    user = Customer.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': 'No user found!'})

    user.username = input()
    user.email = input()
    user.phoneNumber = input()
    user.address = input()

    db.session.commit()

    return jsonify({'message': 'user has been edited'})
    pass


# edit product info
@app.route('/product/<string:public_id>', methods=['PUT'])
def edit_product(public_id):
    partner = Partner.query.filter_by(public_id=public_id).first()
    product = Product.query.filter_by(db.ForeignKey).first()

    if product.partner_id != partner.id:
        return jsonify({'message': 'No product found!'})

    else:
        product.title = input()
        product.content = input()
        product.price = input()
        product.product_category_id = input()

    db.session.commit()

    return jsonify({'message': 'product has been edited'})
    pass

#
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
                         ).join(Category, Product.product_category_id == Category.id).filter(
        Category.id == category).all()
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

    q = db.session.query(
        Partner.username,
        Product.title,
        Product.content,
        Product.price,
        ).join(Partner, Product.partner_id == Partner.public_id).filter(
            Product.partner_id == public_id).all()

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
