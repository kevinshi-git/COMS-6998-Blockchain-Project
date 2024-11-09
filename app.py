from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, migrate


app = Flask(__name__)
app.debug = True

# adding configuration for using a sqlite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'

# Creating an SQLAlchemy instance
db = SQLAlchemy(app)
class Users(db.Model):
    username = db.Column(db.String(100), primary_key=True)
    password=db.Column(db.String(100), unique=False, nullable=False)
    def __repr__(self):
        return f"username: {self.username}, Hashed Password: {self.password}"
# Settings for migrations
migrate = Migrate(app, db)

@app.route('/')
def log_in():
   return render_template('log_in.html')   

@app.route('/new_user')
def new_user():
   return render_template('new_user.html') 

@app.route('/user/<username>')
def search_website(username=None):
   return render_template('user.html',username=username)

@app.route('/verify_login', methods=['POST'])
def verify_login():
    json_data = request.get_json()   
    username=json_data["username"]
    password=json_data["password"]
    query_res=Users.query.get(username)
    res=True
    if not query_res:
        res=False
    elif query_res.password!=password:
        res=False
    return jsonify(data = res)

@app.route('/create_new_user', methods=['POST'])
def create_new_user():
    json_data = request.get_json()  
    username= json_data["username"]
    password=json_data["password"]
    query_res=Users.query.get(username)
    if query_res:
        res=False
    else:
        res=True
        p = Users(username=username, password=password)
        db.session.add(p)
        db.session.commit()

    return jsonify(data = res)

if __name__ == '__main__':
   app.run(debug = True)




