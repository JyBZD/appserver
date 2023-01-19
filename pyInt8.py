from flask import Flask, send_from_directory
import os
import requests
import json

app = Flask(__name__)

from flask import request, jsonify
from itsdangerous import Serializer
import secrets
secret_key = secrets.token_hex(96)

expiration_time = '3600'

correct_pin = '2498'

@app.route('/submit-pin', methods=['POST'])
def submit_pin():
    pin = request.json.get('pin')
    if pin == correct_pin:
        # Create a JSON Web Token (JWT) with a short expiration time
        s = Serializer(secret_key, expiration_time)
        token = s.dumps({'user_id': 'jb'})
        # Return the token to the client
        return jsonify({'token': token}), 200
    else:
        return jsonify({'error': 'Incorrect PIN'}), 401

# @app.before_request
def check_token():
    # List of endpoints that don't require authentication
    public_endpoints = ['/', '/submit-pin', '/public/posts', '/<path:path>']

    # Check if the current endpoint is in the list of public endpoints
    if request.endpoint in public_endpoints:
        return

    token = request.headers.get('Authorization')
    if token:
        try:
            s = Serializer(secret_key)
            data = s.loads(token)
        except:
            return jsonify({'error': 'Invalid token'}), 401
    else:
        return jsonify({'error': 'Token not found'}), 401





@app.route('/<path:path>')
def send_file(path):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    return send_from_directory(os.path.join(current_dir, 'dist/int8xyz'), path)

@app.route("/")
def index():
    return send_from_directory(os.path.join(os.getcwd() ,'dist/int8xyz'), 'index.html')

@app.route("/public/posts")
def public_posts():
    response = requests.get('http://127.0.0.1:8888/public/posts')
    posts = response.json()
    return posts

@app.route("/submit-post", methods=['POST'])
def submit_post():
    resp = request.get_json()
    headers = {'Content-type': 'application/json'}
    response = requests.post('http://127.0.0.1:8888/submit-post', data=json.dumps(resp), headers=headers)

    # Check if the request was successful
    if response.status_code == 200:
        return response.text, 200
    else:
        return jsonify({"error": "An error occurred while submitting the post"})



if __name__ == "__main__":
    app.run()
