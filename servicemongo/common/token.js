const crypto = require('crypto');
const common = require("../common/crypto");
var assert =  require('assert');
const jwt = require("jsonwebtoken");

const authorise = (req, res, next)=>{

	 try{
	 
	   var token = req.headers.authorization.replace('Bearer','');
	   console.log(token);

	   if(!token){

	   	 res.json({
            status:false,
            message:'Token is require'
            })
	   }else{

	   	    const tokenData = jwt.verify(token,common.secret);
	   	    req.currentUser = tokenData;
	   	    //console.log(tokenData);
	   	    next();
	   }

	}catch(error){
          res.json({
            status:false,
            message:'Token is invalid'
            })

	}

}

module.exports = {
	authorise
}