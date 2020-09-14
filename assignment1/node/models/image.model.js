var mongoose = require("mongoose");

var ImageSchema = new mongoose.Schema({
	user_id: {type: String, required: true},
	image_path: {type: String, required: true}	
},
 {timestamps: true} 
);

module.exports = mongoose.model("Image", ImageSchema);