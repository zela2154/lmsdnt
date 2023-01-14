/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const payementCtrl = require('../controllers/payement')
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
/*** Routage de la ressource Lesson */
router.get('/', checkTokenMiddleware, payementCtrl.getAllPayements)
router.get('/:id', checkTokenMiddleware, payementCtrl.getPayement)
router.post('/', checkTokenMiddleware, payementCtrl.addPayement)
router.put('/:id', checkTokenMiddleware, payementCtrl.updatePayement)
router.delete('/:id', checkTokenMiddleware, payementCtrl.deletePayement)

module.exports = router;