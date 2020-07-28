const mongoose = require('mongoose');
//User Schema
let UserSchema = new mongoose.Schema({
	 name: {
		type: String,
		required: true
	  },
	  email: {
		type: String,
		required: true
	  },
	  password: {
		type: String,
		required: true
	  },
	  date: {
		type: Date,
		default: Date.now
	  }
});
module.exports = mongoose.model('users', UserSchema);