import pika
import time
import json
from pyrebase import pyrebase

time.sleep(15)

DEV_MODE = True

RABBITMQ_HOST = RABBITMQ_HOST = 'localhost' if DEV_MODE else 'rabbitmq'

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

print(' [*] Connecting to RabbitMQ...')

for i in range(0, 3):
    try:
        def verify_email_callback(ch, method, properties, body):
            try:
                payload = json.loads(body.decode())
                print(" [x] Verifying email for %s..." % payload['email'])
                auth.send_email_verification(payload['idToken'])
                print(" [x] Done")
                ch.basic_ack(delivery_tag=method.delivery_tag)
            except Exception as e:
                print(" [x] Email verification could not be performed!")
                ch.basic_ack(delivery_tag=method.delivery_tag)


        def reset_password_callback(ch, method, properties, body):
            try:
                print(" [x] Resetting password for...")
                payload = body.decode()
                auth.send_password_reset_email(payload)
                print(payload)
                ch.basic_ack(delivery_tag=method.delivery_tag)
            except Exception as e:
                print(" [x] Password reset could not be performed!")
                ch.basic_ack(delivery_tag=method.delivery_tag)

        connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
        channel = connection.channel()
        channel.queue_declare(queue='task_queue', durable=True)
        channel.queue_declare(queue='verify_email_queue', durable=True)
        channel.queue_declare(queue='reset_password_queue', durable=True)
        print(' [*] Connected to RabbitMQ successfully!')
        print(' [*] Waiting for messages.')

        channel.basic_qos(prefetch_count=1)
        channel.basic_consume(queue='verify_email_queue', on_message_callback=verify_email_callback)
        channel.basic_consume(queue='reset_password_queue', on_message_callback=reset_password_callback)
        channel.start_consuming()
    except:
        print(' [*] Connection to RabbitMQ failed! Retrying one more time...')
        time.sleep(5)
        continue
    break

