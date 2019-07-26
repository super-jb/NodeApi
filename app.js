const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routing request process
const productRoutes = require('./api/v1/routes/products');
const orderRoutes = require('./api/v1/routes/orders');
const userRoutes = require('./api/v1/routes/users');

//connection to MongoDB
mongoose.connect(
  'mongodb+srv://sa:' + process.env.MONGO_ATLAS_PSW + '@cluster0-v3kms.gcp.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  });

mongoose.Promise = global.Promise; // uses the default node.js Promise implementation

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false})); // only support simple bodies for urlEncoded data
app.use(bodyParser.json());

//CORS handling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/users', userRoutes);

// gets triggered when there's a routing error
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// gets triggered if there's any unhandled exception in app
app.use((error, req, res, next) => {
  res.status(500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;