"use strict"
const dotenv = require('dotenv') 
dotenv.config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose') ;;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.enable('trust proxy');
const swaggerUi = require('swagger-ui-express') ;
const swaggerDocument = require( './swagger.json')

// Rest Api

const port = process.env.PORT || 3000;

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},(err, client) => {
  if (err) return console.log(err);

 console.log(`Connected to MongoDB: ${uri}`);
});

const animals  = require('./app/routes/Animals.js');
app.use('/api/animals', animals);

const tests  = require('./app/routes/Tests.js');
app.use('/api/tests', tests);

const api  = require('./app/routes/Api.js');
app.use('/api', api);
          
// Swagger

const options = {};
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

app.listen(port, () => { 
    console.log(`Example app is listening at ${port}`);
})  