const express = require('express');
const router = express.Router();
const azureController = require('../../controllers/azureController');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/azure-upload-url", (req, res) => {
    /* 
     * #swagger.tags = ['Azure']
     * #swagger.summary = 'Sube el blob de la imagen al blob storage de azure'
     * #swagger.description = 'Sube el blob de la imagen al blob storage de azure'
     * #swagger.responses[200] = {
     *      description: 'Blob on cloud!'
     * }
     }
    */
    azureController.generateUrl(req, res)
});

module.exports = router;