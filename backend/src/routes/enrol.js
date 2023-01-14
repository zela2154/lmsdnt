/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const enrolCtrl = require('../controllers/enrol')
const  checkTokenMiddleware = require('../jsonwebtoken/check')
/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()

/*********************************************/
/*** Middleware pour logger dates de requete */
router.use( (req, res, next) => {
    const event = new Date()
    console.log('User Time:', event.toString())
    next()
})


/**********************************/
/*** Routage de la ressource Devise */
router.get('/', checkTokenMiddleware, enrolCtrl.getAllEnrols)
router.get('/:id', checkTokenMiddleware, enrolCtrl.getEnrol)
router.post('', checkTokenMiddleware, enrolCtrl.addEnrol)
router.put('/:id', checkTokenMiddleware, enrolCtrl.updateEnrol)
router.delete('/:id', checkTokenMiddleware, enrolCtrl.deleteEnrol)

module.exports = router;