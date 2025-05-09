const express = require("express");
const userController = require("../../controllers/userController");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));




router.get("/", (req,res) => {
    /* 
     * #swagger.tags = ['Users']
     * #swagger.summary = 'Obtiene una lista de usuarios'
     * #swagger.description = 'Obtiene una lista de usuarios'
     * #swagger.responses[200] = {
     *      description: 'Lista de usuarios'
     * }
     }
    */
    userController.getAllUsers(req, res);
});

router.get("/:userId", (req, res) => {
    /* 
     * #swagger.tags = ['Users']
     * #swagger.summary = 'Obtiene un usuario segun el id'
     * #swagger.description = 'Obtiene un usuario segun el id'
     * #swagger.responses[200] = {
     *      description: 'Usuario obtenido!'
     * }
     }
    */
    userController.getOneUser(req, res)
});

router.post("/", (req, res) => {
    /* 
     * #swagger.tags = ['Users']
     * #swagger.summary = 'Crea un nuevo usuario'
     * #swagger.description = 'Crea un nuevo usuario'
     * #swagger.responses[200] = {
     *      description: 'Usuario creado!'
     * }
     * #swagger.consumes = ['application/json'] 
     * #swagger.parameters['body'] = { in: 'body', schema: {$fullName: 'John Doe', $username: 'test', $email: 'test@test.com', $password: 'test1234'}}
    */

    console.log(req.body)
    userController.createNewUser(req,res)
});

router.patch("/:userId", (req, res) => {
    /* 
     * #swagger.tags = ['Users']
     * #swagger.summary = 'Actualiza un usuario'
     * #swagger.description = 'Actualiza un usuario'
     * #swagger.responses[200] = {
     *      description: 'Usuario actualizado!'
     * }
     * #swagger.parameters['fullname'] = { in: 'string', description: 'el nombre completo',required: true,type: 'string', format: 'text'}
     * #swagger.parameters['username'] = { in: 'string', description: 'el nombre de usuario',required: true,type: 'string', format: 'text'}
     * #swagger.parameters['email'] = { in: 'string', description: 'el correo del usuario',required: true,type: 'string', format: 'email'}
     }
    */
    userController.updateOneUser(req, res)
});

router.delete("/:userId", (req, res) => {
    /* 
    * #swagger.tags = ['Users']
     * #swagger.summary = 'Borra un usuario segun id'
     * #swagger.description = 'Borra un usuario segun id'
     * #swagger.responses[200] = {
     *      description: 'Usuario borrado!'
     * }
     }
    */
    userController.deleteOneUser(req, res)
});

module.exports = router;