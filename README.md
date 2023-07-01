# mongo-arm

# prequisites

- Have nodejs > v16 installed
- Docker desktop installed

# build

- cd to this directory
- To build first run a `npm install` or if you use yarn: `yarn install`
- first determine docker containers IP, see further down in this readme (stop web container, change, and rerun `./run.sh`)
- see later in this readme run docker compose, or run: `docker-compose build` and `docker compose up`

# content of package.json

- Needed nodjs packages already installed after running `npm install`:

- `npm install mongo --save-dev`
- `npm install mongoose --save-dev`
- `npm install express -save-dev`
- `npm install cors -save-dev`
- `npm install dotenv -save-dev`
- `npm install swagger-ui-express -save-dev`
- `npm install uuid -save-dev`

# mongodb official docker images

- Mongo documentation now official image also for ARM64 / Apple Silicon!
- https://hub.docker.com/_/mongo

# build & start docker via docker compose
- To start the docker image do following:
- `cd to this directory`
- `chmod +x ./run.sh`
- run in a console: `./run.sh`
- `docker-compose build`
- `docker compose up`

# connect to docker container

- Replace <172.19.0.2> in the .env file with your localmachines gateway address (see futher down in this README)
- Connectionstring: `mongodb://root:example@172.19.0.2:27017/myFirstDatabase?retryWrites=true&w=majority`

# Mongodb client to test db

- input the Connectionstring
- To test use free better mongodb GUI: https://www.mongodb.com/try/download/compass
- (Testing mongodb in https://studio3t.com tryout 30 days)

# Determine your machines mongodb dockercontainers machineinternal IP

- Get gateway address of your mongo container replace IP <172.19.0.2>
- `mongoose.connect('mongodb://root:example@172.19.0.2:27017/admin');`

# Access dockercontainers linux shell

- Connect to the shell used to set credetials!
- Replace with your container name <mongo-arm-mongo-container-1>:
- In a terminal get on the containers linux:
- `docker exec -it mongo-arm-mongo-container-1 bash`
- `mongosh mongodb://localhost:27017`

# Optional open config via nano

- Optional ():
- (`apt-get update`)
- (`apt-get install nano`)
- (`nano /etc/mongod.conf`) --> file doesn't exist, get correct filename


# IMPORTANT: Set correct credetials, run as a must (in the linux shell of the container)

- see the credentials defined in docker-compose.yml file!
- `mongosh --port 27017 -u root -p 'example' --authenticationDatabase 'admin'`
- Enter in the shell
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

# Determine your mongodb containers Host IP something like 172.xx.0.2
 
- `docker ps` check the name of your container replace <mongo-arm-mongo-container-1> with your containers' name
- `docker inspect mongo-arm-mongo-container-1 `
- `Gateway IP is on my machine: 172.19.0.2 replace with youe environments IP`

# Content of nodejs' .env file

- Need an .env rile in your projects root directory:
- .env File content, replace <172.19.0.2> with conatiner gateway IP:
`````
MONGODB_URI=mongodb://root:example@172.19.0.2:27017/myFirstDatabase?retryWrites=true&w=majority
PORT=3000
NODE_ENV=production
`````

# Test the api via REST Client

- To test use a REST Client like https://paw.cloud/ or POSTMAN https://www.postman.com/:
- Sample API call to GET http://localhost:3000/api/projects/5e270579-ed2b-475f-a517-ca68713a5b65
- `id = 5e270579-ed2b-475f-a517-ca68713a5b65`
- Sample API Call POST http://localhost:3000/api/projects
- `{ "id": 1, "client_id": "2222", "title": "Bar", "active": false }`