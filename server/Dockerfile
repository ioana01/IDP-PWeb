FROM alpine:edge

RUN apk add --update py3-pip

COPY requirements.txt /usr/src/app/
RUN pip install --no-cache-dir -r /usr/src/app/requirements.txt

COPY server.py /usr/src/app/

EXPOSE 7020

CMD ["python3", "/usr/src/app/server.py"]