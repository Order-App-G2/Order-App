from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SECRET_KEY'] = '0fed4204af728cc75af855673b710ce4'

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///orders.db' //for testing
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:2865428@localhost/Orders'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(255), unique=True)
    email = db.Column(db.String(255), unique=True)
    username = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255), nullable=False)
    products = db.relationship('Product', backref='owner', lazy=True)

    user_role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)

    def __init__(self, public_id, email, username, password, user_role_id):
        self.public_id = public_id
        self.email = email
        self.username = username
        self.password = password
        self.user_role_id = user_role_id


class Roles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String, unique=True, nullable=False)

    user_role = db.relationship('User', backref='role', lazy=True)

    def __init__(self, role):
        self.role = role


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False)

    user_id = db.Column(db.String(255), db.ForeignKey('user.public_id'), nullable=False)
    product_category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)

    def __init__(self, title, content, price, user_id, product_category_id):
        self.title = title
        self.content = content
        self.price = price
        self.user_id = user_id
        self.product_category_id = product_category_id


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

    category_product = db.relationship('Product', backref='role', lazy=True)


# routes
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
@app.route('/user', methods=['PUT'])
def edit_user():
    pass


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


# gets all product(non auth needed)
@app.route('/home', methods=['GET'])
def get_all_products():
    products = Product.query.all()

    output = []
    for product in products:
        product_data = {'public_id': product.title, 'content': product.content}
        output.append(product_data)

    return jsonify({'product': output})


@app.route('/')
def hello():
    return jsonify({'hello': 'world'})


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


@app.route('/productCategory/<category>', methods=['GET'])
def get_product_by_category(category):
    pass


if __name__ == '__main__':
    app.run(debug=True)
