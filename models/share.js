var mongoose = require("mongoose");
var share = new mongoose.Schema({
	sharedtoid:{
			type:String,
			required:true,
		},
	sharedbyid:{
			type:String,
			required:true
		},
	url:{
		type:String,
		default:0
	},
	title:{
		type:String,
		required:true
	},
	name:{
		type:String,
		required:true
	},
	created_at: {
	   	type: Date, 
	   	default: Date.now
	}
})	

var share = mongoose.model("share",share);
module.exports = share;