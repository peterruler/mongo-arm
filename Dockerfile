FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Co0py dependencies 
COPY package*.json ./

# Install dependencies 
RUN npm install

RUN npm ci --only=production

# Bundle app source
# COPY . .
COPY ./node_modules ./node_modules
COPY ./app ./app
COPY ./.env ./
COPY ./server.js ./
COPY ./swagger.json ./

EXPOSE 3000
CMD [ "node", "server.js" ]