const multer = require('multer');
const upload = multer();
const { authJwt } = require("../middleware");
const teaController = require("../controllers/tea.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept",
            'Access-Control-Allow-Origin: *' 
        );
        next();
    });

var router = require("express").Router();

router.get('/', teaController.getAllTea);

// router.delete('/', teaController.deleteAllTea);

router.get('/:name', teaController.getOneTea);
router.post('/:name', teaController.newComment);
router.delete('/:name', teaController.deleteOneTea);

router.post('/', teaController.uploadImg , teaController.newTea);


app.use('/api/tea',[authJwt.verifyToken],
router);
}