const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

// -------
// GET ALL
// -------
exports.getAll = (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate('product', 'name')  // populates product.name in response
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        orders: docs.map(doc => {
          return {
            product: doc.product,
            quantity: doc.quantity,
            _id: doc._id,
            request: {
              type: "GET",
              url: 'http://localhost:8000/api/v1/orders/' + doc._id
            }
          }
        })
      }
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
};

// ---------
// GET BY ID
// ---------
exports.getById = (req, res, next) => {
  const id = req.params.id;
  Order.findById(id)
    .select('product quantity _id')
    .populate('product') // populates entire product entity
    .exec()
    .then(doc => {
      if(doc){
        res.status(200).json({
          order: doc,
          request: {
            type: "GET",
            url: 'http://localhost:8000/api/v1/orders/' + doc._id
          }
        });
      }
      else {
        res.status(404).json({ message: 'No valid order for id:' + id });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
};

// ----
// POST
// ----
exports.create = (req, res, next) => {

  Product.findById(req.body.product)
    .then(product => {
      if(!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      const order = new Order({
        _id: new mongoose.Types.ObjectId,
        quantity: req.body.quantity,
        product: product._id
      });

      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order created successfully",
        createdOrder: {
          product: result.product,
          quantity: result.quantity,
          _id: result._id,
          request: {
            type: "GET",
            url: 'http://localhost:8000/api/v1/orders/' + result._id
          }
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        message: "Error creating Order",
        error: err
      });
    })
};

// ------
// DELETE
// ------
exports.deleteById = (req, res, next) => {
  const id = req.params.id;
  Order.deleteOne({_id: id})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};