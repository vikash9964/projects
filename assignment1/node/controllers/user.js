const common = require("../common/crypto");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const jwtKey = common.secret;
const jwtExpirySeconds = 300;
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
                                        firstName: results.firstName,
                                        lastName: results.lastName,
                                        randomKey: common.genrateSalt(8)
                                      }, 
                                      jwtKey, 
                                      {algorithm: "HS256",expiresIn: jwtExpirySeconds, }
                                )

                return res.json({
                    ok:true,
                    token : token,
                    firstName : results.firstName,
                    message:'successfully authenticated'
                })


                 }else{

                  return res.json({
                      ok:false,
                      message:"Email and password does not match"
                  }) 

                 }  

               }else{

                return res.json({
                      ok:false,
                      message:"Email and password does not match"
                  }) 


               }
        }else{

                  return res.json({
                      ok:false,
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
                      ok:false,
                      message:'This email address already exist.'
                  })
             }  else{

                  hash = bcrypt.hashSync(req.body.password); 
                  /*let image = (req.file) ? "avatar/"+req.file.filename : "";*/

                  console.log(req.file);
                  var user = new User();
                  user.firstName = req.body.firstName;
                  user.lastName = req.body.lastName;
                  user.fatherName = req.body.fatherName;
                  user.email = req.body.email;
                  user.password = hash;
                  user.mobile = req.body.mobile;
                  user.dob = req.body.dob;
                  user.country = req.body.country;
                  user.gender = req.body.gender;
                  //user.avatar = image;
                  user.save((err, results) => {
                      if (!err) {

                        res.json({
                          ok:true,
                          data:results,
                          message:'user registered sucessfully'
                      })

                      }else {
                        return res.json({
                      ok:false,
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
            ok:false,
            message:'there are some error with query'
            })

      }else{ 
        
        res.json({
                    ok:true,
                    data : results,
                    message:'successfully'
                })
      }

   })

}

const allUsers = async(req , res)=>{
  //console.log(req.currentUser);
  await User.find((err,results)=>{ 

    if (err) {
          res.json({
            ok:false,
            message:'there are some error with query'
            })

      }else{ 
        
        res.json({
                    ok:true,
                    items : results,
                    message:'successfully'
                })
      }

   })

}



const userDelete = async(req , res)=>{
  console.log(req.body.id);  

  await User.remove({'_id': req.body.id } , (err,results)=>{ 

    if (err) {
          res.json({
            ok:false,
            message:'there are some error with query'
            })

      }else{ 
        
        res.json({
                    ok:true,
                    data : results,
                    message:'successfully'
                })
      }

   })

}


module.exports = {
	login,
	register,
	userDetails,
  allUsers,
  userDelete
}