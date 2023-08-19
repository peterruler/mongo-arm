# mongo-arm

- Nodejs mongodb REST backend that uses docker / docker compose

# Prerequisites

- Have nodejs > v16 installed https://nodejs.org/en#download
- Docker desktop installed https://www.docker.com/products/docker-desktop/
- Rest client e.g. postman https://www.postman.com/ (optional)

# Build

- cd to this directory
- To build first run a `npm install` or if you use yarn: `yarn install`
- first determine docker containers IP, see further down in this readme (stop web container, change, and rerun `./run.sh`)
- see later in this readme run docker compose, or run: `docker-compose build` and `docker compose up`

# Content of package.json (optional)

- Needed nodjs packages already installed after running `npm install`:

- `npm install mongo --save-dev`
- `npm install mongoose --save-dev`
- `npm install express -save-dev`
- `npm install cors -save-dev`
- `npm install dotenv -save-dev`
- `npm install swagger-ui-express -save-dev`
- `npm install uuid -save-dev`

# Mongodb official docker images (optional)

- Mongo documentation now official image also for arm64 / apple silicon!
- https://hub.docker.com/_/mongo

# Build & start docker via docker compose

- To start the docker image do following:
- `cd to this directory`
- `chmod +x ./run.sh`
- run in a console: `./run.sh`
- or type in terminal either

- Build / rebuild (delete or stop web-1 (Container_ID via `docker ps`) individually in docker desktop):

- `docker-compose build`

- Start the two containers:

- `docker compose up`

# Stop & delete container

- In a new terminal call
- `docker ps` to get Container_ID
- `docker stop <Container_ID>`
- `docker rm <Container_ID>`
- in a terminal call `docker ps` to get Container_ID
- `docker compose up` to restart the web container

# Connect to docker container

- Replace <172.19.0.2> in the .env file with your localmachines gateway address (see further down in this README)
- Connectionstring: `mongodb://root:example@172.19.0.2:27017/myFirstDatabase?retryWrites=true&w=majority`

# Mongodb client to test db

- input the connectionstring
- To test use free better mongodb GUI: https://www.mongodb.com/try/download/compass
- Enter connectionstring: `mongodb://root:example@172.19.0.2:27017/admin`
- (Testing mongodb in https://studio3t.com tryout 30 days, obsolete)

# IMPORTANT: Determine your machines mongodb dockercontainers machineinternal IP

- Get gateway address of your mongo container replace ip <172.19.0.2>
- Nodejs command to connect via mongoose (not needed):
- `mongoose.connect('mongodb://root:example@172.19.0.2:27017/admin');`

# Access dockercontainers linux shell

- Connect to the shell used to set credentials!
- Replace `mongo-arm-mongo-container-1` with your container name from `docker ps`:
- In a terminal get on the containers linux:
- `docker exec -it mongo-arm-mongo-container-1 bash`
- `mongosh mongodb://localhost:27017`

# Optional open config via nano in open dockercontainers' internal shell (optional)

- optional ():
- (`apt-get update`)
- (`apt-get install nano`)
- (`nano /etc/mongod.conf`) --> file doesn't exist, get correct filename


# IMPORTANT: Set correct credentials, run as a must (in the linux shell of the container)

- Must grant user `root` with password `example` access to the `myfirstDatabase` database!
- In mongodb compass create a db with name `myfirstDatabase` with two collections named `issues` and one `projects`
- see the credentials defined in docker-compose.yml file!
- `docker exec -it mongo-arm-mongo-container-1 bash` then:
- `mongosh --port 27017 -u root -p 'example' --authenticationDatabase 'admin'` with the `mongosh` command you enter the containers shell
- In the shell, type this following full content:
````
use myFirstDatabase
db.createUser(
  {
    user: "root",
    pwd: "example",
    roles: [ "readWrite", "dbAdmin" ]
  }
)
````

# Determine your mongodb containers host ip something like 172.xx.0.2
 
- `docker ps` check the name of your container replace mongo-arm-mongo-container-1 with your containers' name
- `docker inspect mongo-arm-mongo-container-1 `
- `Gateway IP is on my machine: 172.19.0.2 replace with your environments IP` mainly in the .env files' MONGODB_URI

# Content of nodejs' .env file

- Need an .env rile in your projects root directory:
- IMPORTANT in .env file content, replace `172.19.0.2` with containers local gateway ip:
`````
MONGODB_URI=mongodb://root:example@172.19.0.2:27017/myFirstDatabase?retryWrites=true&w=majority
PORT=3000
NODE_ENV=production
`````

# Test the api via REST client

- To test use a REST client like https://paw.cloud/ or postman https://www.postman.com/:
- In compass load issues and test projects from _Projects folder in this repository.
- Sample API call to GET http://localhost:3000/api/projects/5e270579-ed2b-475f-a517-ca68713a5b65
- `id = 5e270579-ed2b-475f-a517-ca68713a5b65`
- Sample API call POST http://localhost:3000/api/projects
- `{ "id": 1, "client_id": "2222", "title": "Bar", "active": false }`

# Demo on free tier oracle cloud arm quadcore

https://keepitnative.xyz/

# Installation Notes for Ubuntu Server
```
sudo apt-get remove docker docker-engine docker.io

sudo apt-get update

sudo apt install docker.io

sudo apt install docker-compose
```

# Some commands differ to the ones on macos
```
sudo docker stop mongo-arm_web_1

sudo docker rm mongo-arm_web_1

sudo docker-compose up

docker exec -it mongo-arm_mongo-container_1 bash 

db.createCollection("issues")

db.createCollection("projects")
```
# docker compose
```
#!/bin/bash
sudo docker-compose build
sudo docker-compose up #note this is different to macos m1
sudo docker ps
sudo docker inspect mongo-arm_mongo-container_1
# 172.18.0.2
- in .env file
- `mongodb://root:example@172.18.0.2:27017/myFirstDatabase?retryWrites=true&w=majority`
# dont forget to rebuild & rerun
sudo docker-compose build
sudo docker-compose up
```
# install services


`cd /etc/systemd/system`

`touch docker.mongo-arm_mongo-container.service`

`vi docker.mongo-arm_mongo-container.service`

Content:
```
[Unit]
Description=mongo-arm_mongo-container_1 container
After=docker.service
Wants=network-online.target docker.socket
Requires=docker.socket

[Service]
Restart=always
ExecStart=/usr/bin/docker start -a mongo-arm_mongo-container_1
ExecStop=/usr/bin/docker stop -t 10 mongo-arm_mongo-container_1

[Install]
WantedBy=multi-user.target
```

# to start stop service
```
# enable:
sudo systemctl enable docker.mongo-arm_mongo-container.service
# start / stop
sudo service docker.docker.mongo-arm_mongo-container stop
sudo service docker.mongo-arm_mongo-container start
```
# Nodeapp install as service

```
without service start nodeapp do a
sudo docker-compose up --> mongo-arm_web_1
to run it forever as a service do the following
cd /etc/systemd/system
# Name Service:
# docker.mongo-arm_web_1.service
sudo touch docker.mongo-arm_web_1.service
sudo vi docker.mongo-arm_web_1.service
````
to finish vi editor, use these commands
To insert content in vi press i for insert
to finish press `ESC` then enter: then 
enter:`wq!` press enter - this writes & quits vi editor

Content of the file `docker.mongo-arm_web_1.service` (simply press `i` then copy paste to insert):

```
[Unit]
Description=mongo-arm_web_1 container
After=docker.service
Wants=network-online.target docker.socket
Requires=docker.socket

[Service]
Restart=always
ExecStart=/usr/bin/docker start -a mongo-arm_web_1
ExecStop=/usr/bin/docker stop -t 10 mongo-arm_web_1

[Install]
WantedBy=multi-user.target
```