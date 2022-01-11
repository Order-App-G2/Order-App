# Order-App
A group of students create a wonderful project

-------------------------------------------------
1.Database download PostgreSQL. create database with the following command: create database Orders

2.Change password in __inti__.py file in api folder
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:CHANGEHERE@localhost/Orders'

3.install venv in the project folder with the following command: 
python -m venv env

4.open project folder in cmd 
activate env: env/Scripts/activate

5.cd backend

6.install all requierment from the requierements.txt file
pip install -r requirements.txt

7.activate pyhton in cmd by typing python

8.create database by typing:
from api import db (make sure you are the backend folder)
db.create_all()

9. make sure you dont have any error in the cmd window
open pgadmin. make sure you have all the tables there.
 
 Project documentation: 
[CT[Софтуерна-архитектура.pdf](https://github.com/Order-App-G2/Order-App/files/7845622/-.pdf)
-Задание.pdf](https://github.com/Order-App-G2/Order-App/files/7845618/CT-.pdf)
