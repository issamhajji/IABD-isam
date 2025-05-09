const express = require("express");
const itemController = require("../../controllers/itemController");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

// router.get("/", itemController.getAllItems);
router.get("/", (req,res) => {
    /* 
     * #swagger.tags = ['Test']
     * #swagger.summary = 'Obtiene una lista de test'
     * #swagger.description = 'Obtiene una lista de test'
     * #swagger.responses[200] = {
     *      description: 'Lista de items'
     * }
     }
    */
    /*  #swagger.parameters['parameterName'] = {in: 'query',description: 'Some description...', type: 'number'} */
    itemController.getAllItems(req, res);
});


module.exports = router;