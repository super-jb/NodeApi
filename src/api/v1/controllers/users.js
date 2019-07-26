const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// -------------
// Signup / POST
// -------------
exports.create = (req, res, next) => {
  User
    .find({ email: req.body.email })
    .exec()
    .then(user => {
      if(user.length >= 1) {
        return res.status(409).json({
          message: 'Email already exists'
        });
      }
      else {
        // SaltRounds: Cost factor controls how much time is needed to calculate a single BCrypt hash. 
        // The higher cost factor, the more hashing rounds are done. 
        // Increasing cost factor by 1 doubles the necessary time. The more time is necessary, the more difficult is brute-forcing.
        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          if(err) {
            return res.status(500).json({
              error: err
            });
          }
          else {
            const user = new User({
              _id: new mongoose.Types.ObjectId,
              email: req.body.email,
              password: hash 
            });

            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: 'User created'
                })
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  message: "Error creating User",
                  error: err
                });
              });
          }
        });
      }
    });
};

// -------------
// Login / POST
// -------------
exports.login = (req, res, next) => {
  User
  .findOne({ email: req.body.email })
  .exec()
  .then(user => {
    if(user.length < 1) {
      return res.status(404).json({
        message: 'Email not found, user doesn\'t exist'
      })
    }
   
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if(err) {
        return res.status(401).json({
          message: 'Authentication failed'
        });
      }
      if(result) {
        const token = jwt.sign({
            email: user.email,
            userId: user._id
          },
          process.env.JWT_KEY,
          {
            expiresIn: '1h'
          });
        return res.status(200).json({
          message: 'Authentication successful',
          token: token
        });
      }
      console.log(2);
      return res.status(401).json({
        message: 'Authentication failed'
      });
    })

  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: "Error logging in user",
      error: err
    });
  });
};

// -------
// GET ALL
// -------
exports.getAll = (req, res, next) => {
  User.find()
    .select("email password _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        users: docs.map(doc => {
          return {
            email: doc.email,
            password: doc.password,
            _id: doc._id
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

// ------
// DELETE
// ------
exports.deleteById = (req, res, next) => {
  const id = req.params.id;
  User.deleteOne({_id: id})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};