FROM alpine:edge

RUN apk add --update py3-pip

WORKDIR /worker-python

COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r ./requirements.txt

COPY worker.py ./

EXPOSE 9999

CMD ["python3", "./worker.py"]