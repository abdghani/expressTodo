var mongoose = require("mongoose");
var bookmark = new mongoose.Schema({
	userid:{
		type:String,
		required:true
	},
	content:{
		type:String,
		required:true
	},
	url:{
		type:String,
		default:0
	},
	created_at: {
	   	type: Date, 
	   	default: Date.now
	}
});	

var bookmark = mongoose.model("bookmark",bookmark);
module.exports = bookmark;