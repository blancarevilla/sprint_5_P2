/* Procesa la carga de archivos en nuestra app */
/* Aqui estará la configuración que necesita multer(requerir multer y path) */
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/products')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})


const uploadFile = multer({ storage: storage })


module.exports = uploadFile;