var express = require('express');
var app = express();
var router = express.Router();
var multer = require('multer');
const user = require("../controllers/user")
const multerServices = require("../services/multerServices")
const token = require("../common/token");
// Defined store route
/*router.route('/login').post(function (req, res) {  
   console.log("sgsdgsg");
});*/

router.post("/login", user.login);
router.post("/register", multer(multerServices.userAvatar).single("image"), user.register);
router.get("/user-details", token.authorise, user.userDetails);

module.exports = router;


/*var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './public/avatar');
    },
    filename: function (request, file, callback) {
        //console.log(file);
        callback(null, file.originalname)
    }
});

var upload = multer({ storage: storage });*/
