const mongoose = require('mongoose');

const Product = require('../models/product');


// -------
// GET ALL
// -------
exports.getAll = (req, res, next) => {
  Product.find()
    .select("name price _id productImage")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            _id: doc._id,
            request: {
              type: "GET",
              url: 'http://localhost:8000/api/v1/products/' + doc._id
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
  Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc => {
      console.log(doc);
      if(doc){
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: 'http://localhost:8000/api/v1/products/' + doc._id
          }
        });
      }
      else {
        res.status(404).json({ message: 'No valid product for id:' + id });
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

  //create a product variable from request
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });

  //save product
  product
    .save()
    .then(result => { 
      console.log(result);
      //return result entity
      res.status(201).json({
        message: "Product created successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          productImage: result.productImage,
          _id: result._id,
          request: {
            type: "GET",
            url: 'http://localhost:8000/api/v1/products/' + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// ---
// PUT
// ---
exports.update =  (req, res, next) => {
  const id = req.params.id;
  var updateObj = req.body;
  
  Product.update({_id: id }, { $set: updateObj })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Product updated",
        request: {
          type: "GET",
          url: 'http://localhost:8000/api/v1/products/' + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// -----
// PATCH
// -----
exports.partialUpdate = (req, res, next) => {
  const id = req.params.id;
  const props = req.body;
  
  Product.update({_id: id }, props)
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Product updated",
        request: {
          type: "GET",
          url: 'http://localhost:8000/api/v1/products/' + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// ------
// DELETE
// ------
exports.deleteById = (req, res, next) => {
  const id = req.params.id;
  Product.deleteOne({_id: id})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};