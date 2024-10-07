from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

@app.route('/')
def log_in():
   return render_template('log_in.html')   


@app.route('/user/<username>')
def search_website(username=None):
   return render_template('user.html',username=username)

@app.route('/verify_login', methods=['POST'])
def get_results():
    json_data = request.get_json()   
    if json_data["username"]=="kevin":
        res=True
    else:
        res=False
    return jsonify(data = res)
if __name__ == '__main__':
   app.run(debug = True)




