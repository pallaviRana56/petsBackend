const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route.js');
const dotenv = require('dotenv');
// This is especially useful for managing configuration variables, such as API keys and database connection strings, in a development environment.
const cors = require('cors')
//  CORS is a security feature implemented by browsers to prevent malicious websites from making requests to other domains. 
// By using the cors middleware, you can configure your server to accept requests from different origins.

require('dotenv').config()
// Load environment variables from .env file

const app = express();

app.use(cors());                // Use the CORS middleware 
app.use(express.json());

const DB = process.env.MONGODB_URI || 
`mongodb+srv://pallavirana8891:yU67oT4HJazGD2eg@blogger.1za5n40.mongodb.net/Pallavi`;
const port = process.env.PORT || 5000;


//MongoDB
mongoose.connect(DB)
    .then(() => console.log("Mongoose is Connected😊😊"))
    .catch((err) => console.log(err));


app.use('/', route);

app.listen(port, () => console.log(`Server is Running Succesfully ${port}💕`));