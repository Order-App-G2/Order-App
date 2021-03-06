import uuid
from datetime import datetime, timedelta
import jwt
from api import app
from api import RECAPTCHA_SECRET_KEY
from api.models import *
from flask import request, jsonify, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import requests


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'token' in request.headers:
            token = request.headers['token']

        if not token:
            return jsonify({'message': 'Token is missing'}), 403

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms='HS256')
            current_user = Customer.query.filter_by(public_id=data['public_id']).first() or Courier.query.filter_by(
                public_id=data['public_id']).first() or Partner.query.filter_by(public_id=data['public_id']).first()

        except:
            return jsonify({'message': 'Token is invalid'}), 401

        return f(current_user, *args, **kwargs)

    return decorated

def verify_recaptcha(token):
    recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify'
    payload = {
        'secret': RECAPTCHA_SECRET_KEY,
        'response': token,
        'remoteip': request.remote_addr,
    }
    response = requests.post(recaptcha_url, data=payload)
    result = response.json()
    return result.get('success', False)


@app.route('/login', methods=['POST'])
def login():
    auth = request.authorization
    data = request.get_json()
    token = data['token']
    if not token:
        return make_response('Not reCaptcha token', 401)
    token_valid = verify_recaptcha(token)
    if not auth or not auth.username or not auth.password or not token_valid:
        return make_response('Not verified', 401, {'WWW-Authenticate': ' Basic realm="Login required!" '})
    user = Customer.query.filter_by(username=auth.username).first() or Partner.query.filter_by(
        username=auth.username).first() or Courier.query.filter_by(username=auth.username).first()

    if not user:
        return make_response('Not verified', 401, {'WWW-Authenticate': ' Basic realm="Login required!" '})

    if check_password_hash(user.password, auth.password):
        exp = datetime.utcnow() + timedelta(minutes=30)
        token = jwt.encode({'public_id': user.public_id, 'exp': exp}, app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({'token': token})

    return make_response('Not verified', 401, {'WWW-Authenticate': ' Basic realm="Login required!" '})


# create customer user
@app.route('/createCustomer', methods=['POST'])
def create_customer():
    """
       The body structure is as follows:
       {
           username: <username:string>,
           password: <password:string>,
           email: <email:string>,
           phoneNumber: <phone_number:string>,
           address: <address:string>,
       }
       :return:
       'customer id': new_customer.public_id,
                    'username': new_customer.username,
                    'email': new_customer.email
       """
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

    return jsonify({'customer id': new_customer.public_id,
                    'username': new_customer.username,
                    'email': new_customer.email})


# create shop account
@app.route('/createPartner', methods=['POST'])
def create_partner():
    """
           The body structure is as follows:
           {
               username: <username:string>,
               password: <password:string>,
               email: <email:string>,
           }
           :return:
           'partner id': new_user.public_id,
                        'username': new_user.username,
                        'email': new_user.email
           """
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

    return jsonify({'public_id': new_user.public_id,
                    'partner id': new_user.username,
                    'email': new_user.email
                    })


# create courier account
@app.route('/createCourier', methods=['POST'])
def create_courier():
    """
               The body structure is as follows:
               {
                   username: <username:string>,
                   password: <password:string>,
                   email: <email:string>,
               }
               :return:
               'courier id': new_courier.public_id,
                            'username': new_courier.username,
                            'email': new_courier.email
               """
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

    return jsonify({'courier id': new_courier.public_id,
                    'username': new_courier.username,
                    'email': new_courier.email})


# get all users and their role
@app.route('/customer', methods=['GET'])
def get_all_users():
    """
                   :return:
                    'customer id': customer.public_id,
                    'email': customer.email,
                    'username': customer.username,
                    'address': customer.address,
                    'email': customer.phoneNumber
                   """
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
@token_required
def get_all_available_couriers(current_user):
    """
                       :return:
                        'email': courier.email,
                        'username': courier.username,
                        'courier id': courier.public_id,
                        'available': courier.available
                       """
    if type(current_user) != Partner:
        return jsonify({'message': 'Cannot perform that function '}), 403

    q = db.session.query(Courier).filter(Courier.available).all()

    output = []
    for courier in q:
        user_data = {
            'username': courier.username,
            'email': courier.email,
            'courier ': courier.public_id,
            'available': courier.available
        }

        output.append(user_data)
    return jsonify({'couriers': output})


@app.route('/changeCourier', methods=['PUT'])
@token_required
def change_availability(current_user):
    """
                  The body structure is as follows:
                    required login
                  :return:
                  'courier': courier.username,
                               'available': new_courier.available
                  """
    if type(current_user) != Courier:
        return jsonify({'message': 'Cannot perform that function '}), 403

    courier = db.session.query(Courier).filter(Courier.public_id == current_user.public_id).first()

    if courier.available:
        courier.available = False

    else:
        courier.available = True

    db.session.commit()
    return jsonify({'courier': courier.username,
                    'available': courier.available})


@app.route('/userRole', methods=['GET'])
@token_required
def get_one_user(current_user):
    if type(current_user) == Customer:
        return jsonify({'usertype': 'customer'})

    if type(current_user) == Courier:
        return jsonify({'usertype': 'courier'})
    if type(current_user) == Partner:
        return jsonify({'usertype': 'partner'})


# delete user
@app.route('/deleteUser', methods=['DELETE'])
@token_required
def delete_user(current_user):
    """
                     The body structure is as follows:
                       required login
                     :return:
                     'user': user.username,
                                  'message': user deleted
                     """

    user = Customer.query.filter(Customer.public_id == current_user.public_id).first() or Courier.query.filter(
        Courier.public_id == current_user.public_id).first() or Partner.query.filter(
        Partner.public_id == current_user.public_id).first()

    if not user:
        return jsonify({'message': 'No user found!'}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({'user': user.username,
                    'message': 'user deleted'})


# edit user info
@app.route('/edit_user', methods=['PUT'])
@token_required
def edit_user(current_user):
    """
           The body structure is as follows:
           {
               username: <username:string>,
               password: <password:string>,
               email: <email:string>,
           }
           :return:
           'user id': user.public_id,
                        'username': user.username,
                        'email': user.email
           """

    if not current_user:
        return jsonify({'message': 'No user found'}), 404

    if type(current_user) == Customer:
        data = request.get_json()
        username = data['username']
        email = data['email']
        phone_number = data['phone_number']
        address = data['address']

        if not username or not email or not phone_number or not address:
            return jsonify({'message': 'All parameters must be filled'})
        if Customer.query.filter_by(username=username).first() or Partner.query.filter_by(
                username=username).first() or Courier.query.filter_by(username=username).first():
            return jsonify({'message': 'username is already taken '}), 400
        if Customer.query.filter_by(email=email).first() or Partner.query.filter_by(
                email=email).first() or Courier.query.filter_by(email=email).first():
            return jsonify({'message': 'email is already taken '}), 400

        current_user.username = username
        current_user.email = email
        current_user.phoneNumber = phone_number
        current_user.address = address

        db.session.commit()
        return jsonify({'public_id': current_user.public_id,
                        'username': current_user.username,
                        'email': current_user.email,
                        'phone_number': current_user.phoneNumber,
                        'address': current_user.address,
                        'message': 'Customer has been edited'})

    elif type(current_user) == Partner:

        data = request.get_json()
        username = data['username']
        email = data['email']

        if not username or not email:
            return jsonify({'message': 'All parameters must be filled'})
        if Customer.query.filter_by(username=username).first() or Partner.query.filter_by(
                username=username).first() or Courier.query.filter_by(username=username).first():
            return jsonify({'message': 'username is already taken '}), 400
        if Customer.query.filter_by(email=email).first() or Partner.query.filter_by(
                email=email).first() or Courier.query.filter_by(email=email).first():
            return jsonify({'message': 'email is already taken '}), 400

        current_user.username = username
        current_user.email = email

        db.session.commit()
        return jsonify({'public_id': current_user.public_id,
                        'username': current_user.username,
                        'email': current_user.email,
                        'message': 'Partner has been edited'})

    elif type(current_user) == Courier:

        data = request.get_json()
        username = data['username']
        email = data['email']

        if not username or not email:
            return jsonify({'message': 'All parameters must be filled'})
        if Customer.query.filter_by(username=username).first() or Partner.query.filter_by(
                username=username).first() or Courier.query.filter_by(username=username).first():
            return jsonify({'message': 'username is already taken '}), 400
        if Customer.query.filter_by(email=email).first() or Partner.query.filter_by(
                email=email).first() or Courier.query.filter_by(email=email).first():
            return jsonify({'message': 'email is already taken '}), 400

        current_user.username = username
        current_user.email = email

        db.session.commit()
        return jsonify({'public_id': current_user.public_id,
                        'username': current_user.username,
                        'email': current_user.email,
                        'message': 'Courier has been edited'})


# edit product info
@app.route('/edit_product/<int:id>', methods=['PUT'])
@token_required
def edit_product(current_user, id):
    """
         The body structure is as follows:
         {
             title: <title>,
             content: <content>,
             price: <int:price>,
             category: <int:category>,
         }
         :return:
         'product': product.title,
         'content': product.content,
         'price': product.price,
         'category': product.category,
         """

    if type(current_user) != Partner:
        return jsonify({'message': 'Can not perform action'}), 403
    else:
        product = Product.query.filter_by(id=id).first()
        data = request.get_json()
        title = data['title']
        content = data['content']
        price = data['price']
        category = data['category']

    if not title or not content or not price or not category:
        return jsonify({'message': 'all parameters must be filled'})
    else:
        product.title = title
        product.content = content
        product.price = price
        product.product_category_id = category

        db.session.commit()
        return jsonify({'product': product.title,
                        'content': product.content,
                        'price': product.price,
                        'category': product.category,
                        'message': 'Product has been edited!'})


@app.route('/deleteProduct/<int:id>', methods=['DELETE'])
@token_required
def delete_product(current_user, id):
    if type(current_user) != Partner:
        return jsonify({'message': 'Cannot perform that function'}), 403

    product = Product.query.filter(Product.id == id).first()
    if not product:
        return jsonify({'message': 'No product found!'}), 404
    if current_user.public_id != product.partner_id:
        return jsonify({'message': 'user can not delete this item'}), 403

    db.session.delete(product)
    db.session.commit()

    return jsonify({'product': product.title,
                    'product id': product.id,
                    'message': 'product deleted'})


# gets all product(non auth needed)
@app.route('/home', methods=['GET'])
def get_all_products():
    products = Product.query.all()

    output = []
    for product in products:
        product_data = {'title': product.title,
                        'content': product.content,
                        'price': product.price,
                        'partner_id': product.partner_id,
                        'product_id': product.id}
        output.append(product_data)

    return jsonify({'products': output})


# add new product
@app.route('/addProduct', methods=['POST'])
@token_required
def new_product(current_user):
    """
     The body structure is as follows:
     {
         title: <title>,
         content: <content>,
         price: <int:price>,
         category: <int:category>,
     }
     :return:
     'product': new_order.id,
     'customer': current_user.public_id,
     'partner id': partner_id
     """
    if type(current_user) != Partner:
        return jsonify({'message': 'Cannot perform that function '}), 405
    data = request.get_json()
    title = data['title']
    content = data['content']
    price = data['price']
    category = data['category']

    if not title or not content:
        return jsonify({'message': 'all parameters must be filled'})
    else:
        product = Product(title=title, content=content, price=price, user_id=current_user.public_id,
                          product_category_id=category)
        db.session.add(product)
        db.session.commit()
        return jsonify({'product':
                            {'title': title,
                             'content': content,
                             'price': price,
                             'category': category}})


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


@app.route('/ownerProducts/', methods=['GET'])
@token_required
def get_all_product_by_owner(current_user):
    if type(current_user) != Partner:
        return jsonify({'message': 'Cannot perform that function '})
    q = db.session.query(
        Partner.username,
        Product.title,
        Product.content,
        Product.price,
        Product.id,
    ).join(Partner, Product.partner_id == Partner.public_id).filter(
        Product.partner_id == current_user.public_id).all()

    output = []

    for product in q:
        user_data = {
            'title': product.title,
            'product_id': product.id,
            'content': product.content,
            'price': product.price,
        }

        output.append(user_data)
    return jsonify({'product': output})


@app.route('/makeOrder', methods=['POST'])
@token_required
def order_products(current_user):
    """
    The new body structure is as follows:
    {
        partner_id: <partner_id>,
        products: [
            {
                product_id: <product_id>,
                quantity: <quantity>
            },
            {...}
        ]
    }
    :return:
    'Order': new_order.id,
    'customer': current_user.public_id,
    'partner id': partner_id
    """
    if type(current_user) != Customer:
        return jsonify({'message': 'Cannot perform that function '})
    data = request.get_json()
    partner_id = data['partner_id']
    new_order = Order(customer_id=current_user.public_id, partner_id=partner_id)
    db.session.add(new_order)
    db.session.flush()

    for entity in data['products']:
        product_id = entity['product_id']
        quantity = entity['quantity']
        products = Order_products(product_id=product_id, order_id=new_order.id, quantity=quantity)
        db.session.add(products)

    db.session.commit()
    return jsonify({'Order':
                        {'order id': new_order.id,
                         'customer': current_user.public_id,
                         'partner id': partner_id}})


@app.route('/addCategory', methods=['POST'])
@token_required
def add_new_category(current_user):
    if type(current_user) != Partner:
        return jsonify({'message': 'Cannot perform that function '})

    data = request.get_json()
    category_name = data['category_name']
    new_category = Category(name=category_name)
    if Category.query.filter_by(name=category_name).first():
        return jsonify({'message': 'category is already exists '}), 400
    else:
        db.session.add(new_category)
        db.session.commit()

        return jsonify({'category': new_category.name,
                        'message': 'has been added'})


@app.route('/orderInformation', methods=['GET'])
@token_required
def check_order_information(current_user):
    if type(current_user) != Customer:
        return jsonify({'message': 'Cannot perform that function '})

    q = db.session.query(
        Order.id,
        Order.order_date,
        Status.order_status).filter(Order.customer_id == current_user.public_id).all()

    output = []
    for order in q:
        user_data = {
            'order_date': order.order_date,
            'order_id': order.id,
            'order_status': order.order_status
        }

        output.append(user_data)
    return jsonify({'order': output})


@app.route('/updateOrderStatus/<int:order_id>/<int:status>', methods=['PUT'])
@token_required
def update_order_status(current_user, order_id, status):
    if type(current_user) == Customer:
        return jsonify({'message': 'Can not perform that action'})

    order = Order.query.filter_by(id=order_id).first()
    courier = Courier.query.filter_by(id=order.courier).first()

    if not order:
        return jsonify({'message': 'No order matches id'})

    if (status != 1) & (status != 2) & (status != 3) & (status != 4) & (status != 5):
        return jsonify({'message': 'Invalid status number'})

    if order.Partner_id != current_user.id:
        return jsonify({'message': 'Order does not match partner'})

    if (type(current_user) == Partner) & (order.Partner_id == current_user.id):
        if status == 4:
            return jsonify({'message': 'Cannot perform that function'})

        order.Order_status = status

        db.session.commit()
        return jsonify({'order_status': order.Order_status})

    if not courier:
        return jsonify({'message': 'Cannot perform that action because order does not have courier'})

    if (type(current_user) == Courier) & (order.courier == current_user.id):
        if (status != 4) & (status != 5):
            return jsonify({'message': 'Cannot perform that function'})

        order.Order_status = status

        if order.Order_status == 5:
            courier.available = True

        db.session.commit()
        return jsonify({'order_status': order.Order_status})


@app.route('/updateOrderCourier/<int:order_id>', methods=['PUT'])
@token_required
def update_order_courier(current_user, order_id):
    if type(current_user) != Partner:
        return jsonify({'message': 'Cannot perform that action'})

    order = Order.query.filter_by(id=order_id).first()
    courier = Courier.query.filter_by(available=True).first()

    if not order:
        return jsonify({'message': 'No order matches id'})

    if not courier:
        return jsonify({'message': 'No available couriers at the moment'})

    if order.courier:
        return jsonify({'message': 'Order already has a courier assigned'})
    else:
        order.courier = courier.id
        courier.available = False

        db.session.commit()
        return jsonify({'courier': courier.username,
                        'message': 'has been assigned to order# ',
                        'order_id': order.id})


@app.route('/getAllCategories', methods=['GET'])
def get_all_categories():
    categories = Category.query.all()

    output = []
    for category in categories:
        product_data = {'category_id': category.id,
                        'category': category.name}

        output.append(product_data)


    return jsonify({'categories': output})
