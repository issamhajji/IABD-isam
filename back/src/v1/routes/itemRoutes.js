const express = require("express");
const itemController = require("../../controllers/itemController");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));




// router.get("/", itemController.getAllItems);
router.get("/", (req,res) => {
    /* 
     * #swagger.tags = ['Items']
     * #swagger.summary = 'Obtiene una lista de items'
     * #swagger.description = 'Obtiene una lista de items'
     * #swagger.responses[200] = {
     *      description: 'Lista de items'
     * }
     }
    */
    itemController.getAllItems(req, res);
});

router.get("/:itemId", (req, res) => {
    /* 
     * #swagger.tags = ['Items']
     * #swagger.summary = 'Obtiene un item segun el id'
     * #swagger.description = 'Obtiene un item segun el id'
     * #swagger.responses[200] = {
     *      description: 'item obtenido!'
     * }
     }
    */
    itemController.getOneItem(req, res)
});

router.post("/", (req, res) => {
    /* 
     * #swagger.tags = ['Items']
     * #swagger.summary = 'Crea un nuevo item'
     * #swagger.description = 'Crea un nuevo item'
     * #swagger.responses[200] = {
     *      description: 'Item creado!'
     * }
     }
    */
    itemController.createNewItem(req,res)
});

router.patch("/:itemId", (req, res) => {
    /* 
     * #swagger.tags = ['Items']
     * #swagger.summary = 'Actualiza un item'
     * #swagger.description = 'Actualiza un item'
     * #swagger.responses[200] = {
     *      description: 'Item actualizado!'
     * }
     }
    */
    itemController.updateOneItem(req, res)
});

router.delete("/:itemId", (req, res) => {
    /* 
     * #swagger.tags = ['Items']
     * #swagger.summary = 'Borra un item segun id'
     * #swagger.description = 'Borra un item segun id'
     * #swagger.responses[200] = {
     *      description: 'Item borrado!'
     * }
     }
    */
    itemController.deleteOneItem(req, res)
});

module.exports = router;