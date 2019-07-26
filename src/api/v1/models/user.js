const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true); // avoid internal deprecation warning messages 

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { 
    type: String,
    required: true,
    unique: true,
    //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
  password: { 
    type: String,
    required: true
  } 
});

module.exports = mongoose.model('User', userSchema);