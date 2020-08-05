from flask import Flask, jsonify
from flask_cors import CORS
import json

# configuration
DEBUG = True

# init app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})


@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong')


@app.route('/getData')
def read_json():
    with open('data.txt', 'r') as data_file:
        return jsonify(eval(data_file.read()))


if __name__ == '__main__':
    app.run()
