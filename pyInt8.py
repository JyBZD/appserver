from flask import Flask, send_from_directory
import os

app = Flask(__name__)

@app.route('/<path:path>')
def send_file(path):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    return send_from_directory(os.path.join(current_dir, 'dist/int8xyz'), path)

@app.route("/")
def index():
    return send_from_directory(os.path.join(os.getcwd() ,'dist/int8xyz'), 'index.html')


if __name__ == "__main__":
    app.run()
