 FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Copy dependencies 
COPY package*.json ./

# Install dependencies 
RUN npm install

RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]