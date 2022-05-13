from flask import Flask, Response, request
from flask.json import jsonify
import json
import pymongo
import datetime
import pika
import time
from flask_cors import CORS
from pyrebase import pyrebase
from bson import json_util

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

DEV_MODE = True
RABBITMQ_HOST = 'localhost' if DEV_MODE else 'rabbitmq'
MONGODB_HOST = 'localhost' if DEV_MODE else 'mongo-database'

firebase_config = {
    "apiKey": "AIzaSyDYe4KcRYqda6X2mNSP_Vg1S0DdIYxUB5g",
    "authDomain": "idp-pweb.firebaseapp.com",
    "databaseURL": "https://idp-pweb-default-rtdb.europe-west1.firebasedatabase.app",
    "projectId": "idp-pweb",
    "storageBucket": "idp-pweb.appspot.com",
}

firebase = pyrebase.initialize_app(firebase_config)
auth = firebase.auth()

try:
    mongo = pymongo.MongoClient(
        host=MONGODB_HOST,
        port=27017
    )
    db = mongo.pweb
    mongo.server_info() # Trigger exception if cannot connect to db
    print('Succesfull connected to mongo')
except Exception as e:
    print(e)
    print('Error - Cannot connect to dbbb')

# current offer id
id_offer = 0
id_request = 0
id_profile = 0

########################################################################

def publish_verify_email(email, idToken):
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
    channel = connection.channel()
    channel.queue_declare(queue='verify_email_queue', durable=True)
    channel.basic_publish(
        exchange='',
        routing_key='verify_email_queue',
        body=json.dumps({'email': email, 'idToken': idToken}),
        properties=pika.BasicProperties(
            delivery_mode=2,  # make message persistent
        ))
    connection.close()
    return '  [x] Publishing verification email for %s' % email


def publish_reset_password(email):
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
    channel = connection.channel()
    channel.queue_declare(queue='reset_password_queue', durable=True)
    channel.basic_publish(
        exchange='',
        routing_key='reset_password_queue',
        body=email,
        properties=pika.BasicProperties(
            delivery_mode=2,  # make message persistent
        ))
    connection.close()
    return '  [x] Publishing reset password for %s' % email


########################################################################

@app.route('/add-job/<cmd>')
def add(cmd):
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST)) 
    channel = connection.channel()
    channel.queue_declare(queue='task_queue', durable=True)
    channel.basic_publish(
        exchange='',
        routing_key='task_queue',
        body=cmd,
        properties=pika.BasicProperties(
            delivery_mode=2,  # make message persistent
        ))
    connection.close()
    return " [x] Sent: %s" % cmd


@app.route('/api/update-profile', methods=['POST'])
def update_profile():
    updateData = request.json()
    profile_payload = request.get_json()
    jwtToken = request.headers.get('Authorization')
    try:
        user = db.profiles.find_one_and_replace({'email': updateData['email']}, profile_payload)
        return jsonify({'message: ': 'Update profile was succesful'}), 200
    except Exception as e:
        print(e)

    return jsonify({'message: ': 'Profile updated'}), 200


@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    email = request.get_json()['email']
    publish_reset_password(email)
    return jsonify({'message: ': 'Password reset email sent'}), 200


@app.route('/api/profile', methods=['GET'])
def get_profile():
    args = request.args
    args = args.to_dict()
    jwtToken = request.headers.get('Authorization')
    try:
        response = db.profiles.find_one({"email": args['email']})
        response = json_util.dumps(response)
        return response, 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error getting profile information'}), 400


@app.route('/api/profile', methods=['POST'])
def post_profile():
    profile_payload = request.get_json()
    jwtToken = request.headers['Authorization']

    global id_profile

    try:
        profile = {
            'id': id_profile,
            'name': profile_payload['name'],
            'email': profile_payload['email'],
            'phone': profile_payload['phone'],
            'userType': profile_payload['userType'],
            'group': profile_payload['group'],
            'createdAt': datetime.datetime.now(),
        }

        db.profiles.insert_one(profile)
        id_profile += 1

        publish_verify_email(profile_payload['email'], jwtToken)

        return jsonify({'message': 'Profile created successfully'}), 201
    except Exception as ex:
        print(ex)
        return jsonify({'message': 'Error creating profile'}), 400




@app.route('/api/offers', methods=['POST'])
def post_offers():
    global id_offer

    # get payload from request
    payload = request.get_json()
    print(payload)

    try:
        id_offer += 1
        offer = {
            'id': id_offer,
            'title': payload['title'],
            'subtitle': payload['subtitle'],
            'location': payload['location'],
            'interval': payload['interval'],
            'description': payload['description'],
            'identifiers': payload['identifiers'],
            'author': payload['author']
        }

        dbResponse = db.offers.insert_one(offer)
        
        return Response(status=201)
    except Exception as ex:
        print(ex)
        return Response(status=409)

@app.route('/api/requests', methods=['POST'])
def post_requests():
    global id_request
    # get payload from request
    payload = request.get_json()
    print(payload)

    try:
        id_request += 1
        offer = {
            'id': id_request,
            'title': payload['title'],
            'subtitle': payload['subtitle'],
            'location': payload['location'],
            'description': payload['description'],
            'identifiers': payload['identifiers'],
            'author': payload['author']
        }

        dbResponse = db.requests.insert_one(offer)
        
        return Response(status=201)
    except Exception as ex:
        print(ex)
        return Response(status=409)

@app.route('/api/offers', methods=['GET'])
def get_offers():
    try:
        # get all the offers from the database
        data = list(db.offers.find())

        # remove the '_id' field inserted by mongoDB 
        for elem in data:
            elem.pop('_id', None)

        response = jsonify(data)
        response.headers.add('Access-Control-Allow-Origin', '*')

        return response, 200
    except Exception as ex:
        print(ex)
        return Response(status=500)

@app.route('/api/requests', methods=['GET'])
def get_requests():
    try:
        # get all the offers from the database
        data = list(db.requests.find())

        # remove the '_id' field inserted by mongoDB 
        for elem in data:
            elem.pop('_id', None)

        response = jsonify(data)
        response.headers.add('Access-Control-Allow-Origin', '*')

        return response, 200
    except Exception as ex:
        print(ex)
        return Response(status=500)

@app.route('/api/favorites', methods=['POST'])
def post_favorite():
    # get payload from request
    payload = request.get_json()
    print(payload)

    try:
        offer = {
            'id': payload['id'],
            'title': payload['title'],
            'subtitle': payload['subtitle'],
            'location': payload['location'],
            'interval': payload['interval'],
            'description': payload['description'],
            'identifiers': payload['identifiers'],
            'author': payload['author'],
            'savedOnAccount': payload['savedOnAccount'],
            'favorite': 'true'
        }

        dbResponse = db.favorites.insert_one(offer)
        
        return Response(status=201)
    except Exception as ex:
        print(ex)
        return Response(status=409)

@app.route('/api/favorites', methods=['GET'])
def get_favorites():
    try:
        # get all the offers from the database
        data = list(db.favorites.find())

        # remove the '_id' field inserted by mongoDB 
        for elem in data:
            elem.pop('_id', None)

        response = jsonify(data)
        response.headers.add('Access-Control-Allow-Origin', '*')

        return response, 200
    except Exception as ex:
        print(ex)
        return Response(status=500)

@app.route('/api/offers/<int:id>', methods=['PUT'])
def put_favorites(id):
    # get payload from request
    payload = request.get_json(silent=True)

    try:
        dbResponse = db.offers.update_one(
            {"id": id},
            {"$set": {
                'favorite': payload['favorite']
            }}
        )

        return Response(status=200)
    except Exception as ex:
        print(ex)
        return Response(status=409)

@app.route('/api/favorites/<int:id>', methods=['DELETE'])
def delete_country(id):
    try:
        dbResponse = db.favorites.delete_one({"id": id})

        return Response(status=200)
    except Exception as ex:
        print(ex)
        return Response(status=500)

@app.route('/api/offers/<int:idOffer>', methods=['GET'])
def get_cities_country(idOffer):
    try:
        data = list(db.offers.find())

        for elem in data:
            elem.pop('_id', None)

        result = list(filter(lambda elem : elem['id'] == idOffer, data))

        return jsonify(result), 200
    except Exception as ex:
        print(ex)
        return Response(status=500)


if __name__ == '__main__':
    app.run('0.0.0.0', port=7020, debug=True)