FROM python:3.7-slim

WORKDIR /server-flask

COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r ./requirements.txt

COPY server.py ./

EXPOSE 7020

CMD ["python3", "./server.py"]