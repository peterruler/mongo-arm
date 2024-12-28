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