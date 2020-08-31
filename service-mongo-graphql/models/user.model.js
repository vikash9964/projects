var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	first_name: {type: String, required: true},
	last_name: {type: String, required: true},
	email: {type: String, required: true},	
	dob: {type: Date},
	avatar: {type: String},
	password: {type: String, required: true},
	status: {type: Boolean, required: true, default: 1}
},
 {timestamps: true} 
);

module.exports = mongoose.model("User", UserSchema);