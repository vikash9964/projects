var multer = require('multer');

exports.userAvatar = { 

 storage : multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './public/avatar');
    },
    filename: function (request, file, callback) {
        console.log(file);
        callback(null, Date.now()+"-"+file.originalname)
    }
})

}

