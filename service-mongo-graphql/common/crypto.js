const crypto = require('crypto');
var assert =  require('assert');

const genrateSalt = (length=10)=>{
	 var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;

}

const secret = "dsgsjksg454151shjvbsjbg{}dgdgdsh,.!@#%^&*()";

module.exports = {
	genrateSalt,
	secret
}