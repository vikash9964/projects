var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	fatherName: {type: String, required: true},		
	dob: {type: Date},
	avatar: {type: String},
	mobile: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	address: {type: String},
	gender: {type: Boolean, required: true, default: 1},
	country: {type: String},
	status: {type: Boolean, required: true, default: 1}
},
 {timestamps: true} 
);

module.exports = mongoose.model("User", UserSchema);