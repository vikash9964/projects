const common = require("../common/crypto");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const jwtKey = common.secret;
const jwtExpirySeconds = 86400;
const mongoose = require('mongoose');
const User = mongoose.model('User');

const login = async(req , res)=>{
	console.log("login");

    await User.findOne( { email: req.body.email , status : 1  }, (err,results)=>{

      console.log(results);

    if (!err) {  

               if(results!==null){

                checkPass = bcrypt.compareSync(req.body.password, results.password);
                if(checkPass==true){

                  const token = jwt.sign(
                                      { 
                                        id: results.id,
                                        email: results.email,
                                        first_name: results.first_name,
                                        last_name: results.last_name,
                                        randomKey: common.genrateSalt(8)
                                      }, 
                                      jwtKey, 
                                      {algorithm: "HS256",expiresIn: jwtExpirySeconds, }
                                )

                return res.json({
                    status:true,
                    token : token,
                    data : results,
                    message:'successfully authenticated'
                })


                 }else{

                  return res.json({
                      status:false,
                      message:"Email and password does not match"
                  }) 

                 }  

               }else{

                return res.json({
                      status:false,
                      message:"Email and password does not match"
                  }) 


               }
        }else{

                  return res.json({
                      status:false,
                      message:'there are some error with query'
                  }) 

                 }  
    
  } );	

}

const register = async(req , res)=>{
	console.log("register");  

  await User.findOne( { email: req.body.email }, (err,data)=>{

    if (!err) {

             if(data!==null) {

                return res.json({
                      status:false,
                      message:'This email address already exist.'
                  })
             }  else{

                  hash = bcrypt.hashSync(req.body.password); 
                  let image = (req.file) ? "avatar/"+req.file.filename : "";

                  console.log(req.file);
                  var user = new User();
                  user.first_name = req.body.first_name;
                  user.last_name = req.body.last_name;
                  user.email = req.body.email;
                  user.password = hash;
                  user.mbile = req.body.mbile;
                  user.dob = req.body.dob;
                  user.avatar = image;
                  user.save((err, results) => {
                      if (!err) {

                        res.json({
                          status:true,
                          data:results,
                          message:'user registered sucessfully'
                      })

                      }else {
                        return res.json({
                      status:false,
                      message:'Error'
                  })         
                      }
                  });

             }          
        }
    
  } );

}


const userDetails = async(req , res)=>{

  //console.log(req.currentUser);

  await User.findOne( { _id: req.currentUser.id }, (err,results)=>{ 

    if (err) {
          res.json({
            status:false,
            message:'there are some error with query'
            })

      }else{ 
        
        res.json({
                    status:true,
                    data : results,
                    message:'successfully'
                })
      }

   })

}


module.exports = {
	login,
	register,
	userDetails
}