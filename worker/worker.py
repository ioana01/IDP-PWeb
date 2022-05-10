import pika
import time
import json
from pyrebase import pyrebase

time.sleep(15)

print(" [*] Initializing Firebase connection...")

firebase_config = {
    "apiKey": "AIzaSyDYe4KcRYqda6X2mNSP_Vg1S0DdIYxUB5g",
    "authDomain": "idp-pweb.firebaseapp.com",
    "databaseURL": "https://idp-pweb-default-rtdb.europe-west1.firebasedatabase.app",
    "projectId": "idp-pweb",
    "storageBucket": "idp-pweb.appspot.com",
}
firebase = pyrebase.initialize_app(firebase_config)
auth = firebase.auth()

print(' [*] Connecting to server ...')

connection = pika.BlockingConnection(pika.ConnectionParameters(host="localhost"))

channel = connection.channel()
channel.queue_declare(queue='task_queue', durable=True)
channel.queue_declare(queue='verify_email_queue', durable=True)
channel.queue_declare(queue='reset_password_queue', durable=True)
print(' [*] Waiting for messages.')


def demo_callback(ch, method, properties, body):
    print(" [x] Received %s" % body)
    cmd = body.decode()

    if cmd == 'hey':
        print("hey there")
    elif cmd == 'hello':
        print("well hello there")
    else:
        print("sorry i did not understand ", body)

    print(" [x] Done")

    ch.basic_ack(delivery_tag=method.delivery_tag)


def verify_email_callback(ch, method, properties, body):
    try:
        payload = json.loads(body.decode())
        print(" [x] Verifying email for %s..." % payload['email'])
        auth.send_email_verification(payload['idToken'])
        print(" [x] Done")
    except Exception as e:
        print(" [x] Email verification could not be performed!")


def reset_password_callback(ch, method, properties, body):
    try:
        print(" [x] Resetting password for...")
        payload = body.decode()
        auth.send_password_reset_email(payload)
        print(payload)
    except Exception as e:
        print(" [x] Password reset could not be performed!")


channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='task_queue', on_message_callback=demo_callback)
channel.basic_consume(queue='verify_email_queue', on_message_callback=verify_email_callback)
channel.basic_consume(queue='reset_password_queue', on_message_callback=reset_password_callback)
channel.start_consuming()