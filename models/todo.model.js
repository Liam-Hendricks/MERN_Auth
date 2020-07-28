const mongoose = require('mongoose');
//todoScheme 
let todoSchema = new mongoose.Schema({
	 user: {
        type: String,
        required: true
	  },
	  item: {
		type: String,
		required: true
      },
      itemID:{
        type: String,
		required: true
      }
    },{timestamps:true}
);
module.exports = mongoose.model('todos', todoSchema);