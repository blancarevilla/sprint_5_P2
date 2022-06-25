// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require('../controllers/mainController')
const productsController = require('../controllers/productsController')
    /***********************PARA LAS IMAGENES ***********************/
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/products')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })
    /********************************************************** */
    /* GET home page. */
router.get('/', controller.index);

router.get('/productDetail/:id/', productsController.productDetail);
// router.get('/productCart', controller.productCart);
// router.get('/login', controller.login);
// router.get('/register', controller.register);
// /*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create);
router.post('/create', upload.any(), productsController.store);
/*** EDIT ONE PRODUCT ***/
router.get('/views/edit/:id/', productsController.edit);
router.post('/productDetail/:id', upload.any(), productsController.update);

// /*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy);
module.exports = router;