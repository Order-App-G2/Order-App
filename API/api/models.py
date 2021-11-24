from api import db


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
