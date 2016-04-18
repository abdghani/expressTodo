var mongoose = require("mongoose");
var todo = new mongoose.Schema({
	userid:{
		type:String,
		required:true
	},
	content:{
		type:String,
		required:true
	},
	completed:{
		type:Boolean,
		default:0
	},
	created_at: {
	   	type: Date, 
	   	default: Date.now
	},
	completedTime: {
		type:Date,
		default:null
	}
});	

var todo = mongoose.model("todo",todo);
module.exports = todo;