var mongoose = require('mongoose');

var todouser = new mongoose.Schema({
	userid:{
		type:String,
		required:true
	},
	displayName:{
		type:String,
		required:true
	},
	photoUrl:{
		type:String,
		required:true
	}
})

var todouser = mongoose.model("todouser",todouser);
module.exports = todouser;