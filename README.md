# Mongodb & Mongoose Nodejs Backend on ARM Processors

- Nodejs mongodb REST backend that uses docker / docker compose

# Prerequisites

- Have nodejs > v16 installed: https://nodejs.org/en#download
- Docker desktop installed: https://www.docker.com/products/docker-desktop/
- Have Mongodb compass installed: https://www.mongodb.com/try/download/compass
- Use a REST client e.g. postman: https://www.postman.com/

# Build

- `cd to this directory`
- In a console run `sudo docker-compose build` and `sudo docker-compose up -d` (e.g. in the internal Microsoft Code console)
- determine your mongodbcontainers ip and change .env connectionstring and build and run, stop, delete, rebuild and rerun!
- to connect to mongodb container see further steps 

# Stop & delete, build & start docker via docker compose

- To start the docker image do following:
- `cd to this directory`
- docker build, run, rm / delete `mongo-arm_web_1` (<Container_ID>) container, change .env, build / rebuild
- `sudo docker ps` to get Container_ID
- `sudo docker-compose build`
- `sudo docker-compose up -d`
- `docker stop <Container_ID>`
- `docker rm <Container_ID>`
- change .env Mongo URI
- `docker-compose build`
- `docker compose up`

# Determine your mongodb containers host ip 

- something like 172.xx.0.2
- `docker ps` check the name of your container replace mongo-arm-mongo-container-1 with your containers' name
- `docker inspect mongo-arm-mongo-container-1`
- `Gateway IP is on my machine: 172.19.0.2 replace with your environments IP` mainly in the .env files' MONGODB_URI

# Change MONGODB_URI 

- delete container mongo-arm_web_1, build & rerun

Content of nodejs' .env file

- Need an .env rile in your projects root directory:
- IMPORTANT in .env file content, replace `172.19.0.2` with containers local gateway ip:

`````
# run as db user instead of the dbAdmin root:example
MONGODB_URI=mongodb://foo:bar@172.19.0.2:27017/myFirstDatabase?retryWrites=true&w=majority
PORT=3000
NODE_ENV=production
`````

- `docker-compose build` // once again
- Retart the containers:
- `docker compose up` // different on ubuntu run `sudo docker-compose up`

# Connect to docker mongodb container

- Replace <172.19.0.2> in the .env file with your localmachines gateway address (see further down in this README)

- connectionstring: `mongodb://foo:bar@172.19.0.2:27017/myFirstDatabase?retryWrites=true&w=majority`
- (or whatever you choose as ://username:password e.g. ://foo:bar)

# Mongodb client to test db

- input the connectionstring
- To test use free better mongodb GUI: https://www.mongodb.com/try/download/compass
- Enter connectionstring: `mongodb://root:example@172.19.0.2:27017/admin`
- `mongodb://localhost:27017/admin` works on your mac as compass connectionstring but not on server
- login to mongodb , use admin database, to set your credentials
- (or whatever you choose as ://username:password e.g. ://foo:bar)

# Connect to mongodb with admin table
- `mongodb://root:example@172.19.0.2:27017/admin`
- (or whatever you choose as ://username:password e.g. ://root:example)

# When access to database fails 
- change rights in dockercontainers linux shell
- Connect to the shell used to set credentials!
- Replace `mongo-arm-mongo-container-1` with your container name from `docker ps`:
- In a terminal get on the containers linux:
- `docker exec -it mongo-arm-mongo-container-1 bash`
- connect to mongodb commandline interface:
- `mongosh mongodb://localhost:27017`

# Set the rights on the mongo commandline interface

IMPORTANT: Set correct credentials, run as a must (in the linux shell of the container)

- Must grant user `root` with password `example` access to the `myfirstDatabase` database (or whatever you choose as username & password)?
- don't mind username & password is machineinternal.

- In mongodb compass create a db with name `myfirstDatabase` with two collections named `issues` and one `projects`
- see the credentials defined in docker-compose.yml file!
- `sudo docker exec -it mongo-arm-mongo-container-1 bash` 
- on ubuntu:
`sudo docker exec -it mongo-arm_mongo-container_1 bash`
then:
- `mongosh --port 27017 -u root -p 'example' --authenticationDatabase 'admin'` with the `mongosh` command you enter the containers shell
- In the shell, type this following full content:
```
# db string use as regular user:
use myFirstDatabase
db.createUser({
  user: "foo",
  pwd: "bar",
  roles: [
    { role: "readWrite", db: "myFirstDatabase" }
  ]
})
```
```
#unsave, but connect via Mongodb Compass
use myFirstDatabase
db.createUser(
  {
    user: "root",
    pwd: "example",
    roles: [ "readWrite", "dbAdmin" ]
  }
)
use admin
db.dropUser("root")

````
- (or set whatever you choose as username & password)
- to exit commandline press enter & exit shell type `exit` and press `ENTER` two times



# Test the api via REST client

- To test use a REST client like postman https://www.postman.com/:
- In compass load issues and test projects from _Projects folder in this repository.
- Sample API call to GET http://localhost:3000/api/projects/5e270579-ed2b-475f-a517-ca68713a5b65
- `id = 5e270579-ed2b-475f-a517-ca68713a5b65`
- Sample API call POST http://localhost:3000/api/projects
- on localhost:3000 do a post on swaggerdocu with payload:
- `{ "id": 1, "client_id": "2222", "title": "Bar", "active": false }`

# Demo on oracle vps stage server
Free tier oracle cloud arm ampere, 24 GB RAM, 50 GB HD, 4 OCPU

https://keepitnative.xyz/

# Tutorial to install on oracle - best free setup

- https://oracle.com/free signup
- ! Must see explanation: https://www.youtube.com/watch?v=Hz58Zkke4VE !
- I chose an installation without hestia, mailbox, wordpress, you can skip those parts
- use https://www.namecheap.com/ for the nice url 5-10 $ per year
- in case of trouble installing the server contact me 7starch@gmail.com

#  Deployment to stage server

- you will need ssh (digital ocean has great tutorials on the topic) login to the servers console & scp (google for it) or git (install git on server and clone repo) to get your data on the server
- on installation to oracle first get your ssh key and save to your local machine
- `ssh <username>@<IP>` see stackoverlow on how to add key
- upload data from local console to server:
- `scp -i /localmachine-pathtokey/ssh.pub -r /localmachinepath/mongo-arm <username>@<IP>:/home/<username>/`

#  Install docker on stage server

Following code is for deployment on stage server e.g. on oracle free tier

Installation Notes for Ubuntu Server
```
sudo apt-get remove docker docker-engine docker.io

sudo apt-get update

sudo apt install docker.io

sudo apt install docker-compose # is different to macos
```

# docker-compose command is different to the one on macos
```
sudo docker stop mongo-arm_web_1

sudo docker rm mongo-arm_web_1

sudo docker-compose up # instead of sudo docker compose up

docker exec -it mongo-arm_mongo-container_1 bash 
# create the two db collections manually in mongodbs commandline interface
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

# run docker services in background without usage of linux services

You can skip instaling services part, the -d flag will make it obsolete

```
sudo docker-compose up -d
```

# [OPTIONAL] install services for mongodb & nodejs-app

- to run the containers forever I chose services, to do so do the following:


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

# [OPTIONAL] enable service

```
# [OPTIONAL] enable:
sudo systemctl enable docker.mongo-arm_mongo-container.service
```
# [OPTIONAL] to start stop service
```
# start / stop
sudo service docker.docker.mongo-arm_mongo-container stop
sudo service docker.mongo-arm_mongo-container start
```

# [OPTIONAL] Nodeapp install as service

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
To insert content in vi press ì for insert
to finish press `ESC` then enter: then 
enter `:wq!` press enter - this writes & quits vi editor

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

# NGINX & Certbot - Swag

To run the services on https on oracle vps, I chose nginx (maps port to 443 / ssl) and certbot (creation of let's encrypt certificate)

- https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04 (winthout swag reverse proxy)
 - https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal (without swag)

- to use nginx as a reverse proxy by using the swag docker container (recommended bundled nginx & certbot, if you're comfy with docker)
- https://docs.linuxserver.io/general/swag
- change `sudo vi /etc/nginx/sites-available/default` `i` Copy & paste + `ESC :wq! ENTER`
- Use your own default file in swag change www.keepitnative.xyz to your own url:
```
server {
    listen      80;
    server_name localhost keepitnative.xyz www.keepitnative.xyz;
    # Always redirect to HTTPS
    return 301 https://keepitnative.xyz$request_uri;
}
server {
        # listen 80;
        listen 443 ssl;
        server_name localhost;
        # redirect 301 https://keepitnative.xyz$request_uri;
        ssl_certificate /etc/letsencrypt/live/keepitnative.xyz/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/keepitnative.xyz/privkey.pem;
        # SSL configuration
        #
        # listen 443 ssl default_server;
        # listen [::]:443 ssl default_server;
        #
        # Note: You should disable gzip for SSL traffic.
        # See: https://bugs.debian.org/773332
        #
        # Read up on ssl_ciphers to ensure a secure configuration.
        # See: https://bugs.debian.org/765782
        #
        # Self signed certs generated by the ssl-cert package
        # Don't use them in a production server!
        #
        # include snippets/snakeoil.conf;

        # root /var/www/html;

        # Add index.php to the list if you are using PHP
        # index index.html index.htm index.nginx-debian.html;

        #server_name _;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                # try_files $uri $uri/ =404;
                proxy_pass http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-NginX-Proxy true;
                proxy_redirect off;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_cache_bypass $http_upgrade;
        }

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        # include snippets/fastcgi-php.conf;
        #
        #       # With php7.0-cgi alone:
        #       fastcgi_pass 127.0.0.1:9000;
        #       # With php7.0-fpm:
        #       fastcgi_pass unix:/run/php/php7.0-fpm.sock;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #       deny all;
        #}
}
```

# [IMPORTANT] Troubleshooting
## do after changing mongodb
# changed ip address of db container

- On IP-address change of db-container: Do stop services first - rebuild web- & db-container with changed address in the .env file. Perform a `sudo docker-compose build --no-cache --pull` do a `sudo docker-compose up -d` then reload services
- List services on linux: `sudo systemctl list-units --type=service --all`

# ERROR: failed to solve: error getting credentials - err: exit status 1, out: “

- `sudo vi $HOME/.docker/config.json`
- The “credsStore” was “desktop” and changed it to “osxkeychain”.
- `sudo chown -R $(id -u):$(id -g) $HOME/.docker`


# enjoy & have fun!