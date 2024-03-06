FROM python:3.10-buster

WORKDIR /code
COPY . /code

RUN chmod +x *.sh
RUN curl -sL https://deb.nodesource.com/setup_14.x |  bash -
RUN apt -y install nodejs
RUN npm install
RUN npm install -g @angular/cli@latest

