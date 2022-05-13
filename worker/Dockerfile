FROM python:3.7-slim

WORKDIR /worker-python

COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r ./requirements.txt

COPY worker.py ./

EXPOSE 9999

CMD ["python3", "./worker.py"]