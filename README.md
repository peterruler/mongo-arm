# Mongodb & Mongoose Nodejs Backend on ARM Processors

# Demo
- The Rest Server is no longer Online on [https://keepitnative.xyz](https://keepitnative.xyz).
- Please use the server on your local computer

# Description

- This is a Nodejs mongodb REST backend that uses docker / docker compose and shows optional deployment to oracle free tier cloud server

# Prerequisites

- Have nodejs latest installed: https://nodejs.org/en#download
- Install docker desktop (Mac): https://docs.docker.com/desktop/setup/install/mac-install/
- Install docker desktop (PC): https://docs.docker.com/desktop/setup/install/windows-install/
- Mongodb compass installed (optional): https://www.mongodb.com/try/download/compass
- Use a REST client e.g. postman (optional): https://www.postman.com/


# Build
- in a terminal cd to this projects directory.
- `sudo docker compose --build`

# Start containers in detached / background mode

- `sudo docker compose up -d`

# Verify connection

- `sudo docker exec -it database_container mongosh --authenticationDatabase admin -u root -p example`
- `show dbs;`

# Test

- call `localhost:3000` in a webbrowser in the swagger-docu and use the payload:
- `{ "id": 1, "client_id": "2222", "title": "Bar", "active": false }`
- choose post projects add payload in the textfield and hit execute! A status code 200 should result!

# Stop & delete docker containers

- `sudo docker compose down -v`

# Tutorial on use mongodb in docker in a good explanation:
- https://www.youtube.com/watch?v=YBPzt4Z-0dQ

# Tutorial to install oracle free tier cloudserver - best free setup
- it offers 24GB RAM, 4 ARM OCPUs
- https://oracle.com/free signup
- ! Must see explanation: https://www.youtube.com/watch?v=Hz58Zkke4VE !
- I chose an installation without hestia, mailbox, wordpress, you can skip those parts
- use https://www.namecheap.com/ for the nice url 5-10 $ per year
- in case of trouble installing the server contact me 7starch@gmail.com

# SSL support
- I use https://certbot.eff.org/
- and Nginx as a reverse proxy

#  Deployment to stage server
- VERY IMPORTANT: during the installation on your oracle cloudinstance - you first get your ssh key - copy it & save to your local machine and store it in the `/Users/<username>/.ssh` folder
- install git on server `sudo apt-get install git`
- the do a `git clone https://github.com/peterruler/mongo-arm.git`
- you will need ssh (digital ocean has great tutorials on the topic) login to the servers console & scp (google for it) or git (install git on server and clone repo) to get your data on the server
- `ssh <username>@<IP>` see stackoverlow on how to add key
- upload data from local console to server (opional):
- `scp -i /localmachine-pathtokey/ssh.pub -r /localmachinepath/mongo-arm <username>@<IP>:/home/<username>/`

#  Install docker on stage server

Following code is for deployment on stage server e.g. on oracle free tier

Installation Notes for Ubuntu Server
```
sudo apt-get remove docker docker-engine docker.io

sudo apt-get update

sudo apt install docker.io

sudo apt install docker-compose # is different to macos

sudo systemctl start docker
```

# docker-compose command is different to the one on macos
```
sudo docker stop mongo-arm-web-1

sudo docker rm mongo-arm-web-1

sudo docker-compose --build

sudo docker-compose up -d # instead of sudo docker compose up

docker exec -it database_container bash

```
# docker compose
```
#!/bin/bash
sudo docker-compose build
sudo docker-compose up -d # note this is different to macos m1
sudo docker ps
sudo docker inspect database_container
sudo docker exec -it database_container bash
show dbs;
use myFirstDatabase;
show collections;
db.users.find();
db.issues.find();
db.projects.find();
```

# Docker Compose file

```
version: '3'
services:
  mongo_db:
    container_name: database_container
    image: mongo:latest
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo_db:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=example
  web:
    build: .
    ports:
    - 3000:3000
    environment:
      MONGODB_URI:  mongodb://root:example@mongo_db:27017/myFirstDatabase?authSource=admin
      PORT: 3000
      NODE_ENV: production
    depends_on:
    - mongo_db
volumes:
  mongo_db: {}
```

# Dockerfile

```
FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Co0py dependencies 
COPY package.json ./
COPY package-lock.json ./

# Install dependencies 
RUN npm install

# Bundle app source
COPY ./app ./app
COPY ./.env ./
COPY ./server.js ./
COPY ./swagger.json ./

EXPOSE 3000
CMD [ "npm", "start" ]
```

# Alternatively
- alternatively you can use the https://www.npmjs.com/package/json-server as a testing backend!

# Improved with ♥ by Pete in 2025
enjoy & have fun!
