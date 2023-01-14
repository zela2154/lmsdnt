/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const currencyCtrl = require('../controllers/currency')
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
router.get('/', currencyCtrl.getAllCurrencies)
router.get('/:id', currencyCtrl.getCurrency)
router.post('/', checkTokenMiddleware, currencyCtrl.addCurrency)
router.put('/:id', checkTokenMiddleware, currencyCtrl.updateCurrency)
router.delete('/:id', checkTokenMiddleware, currencyCtrl.deleteCurrency)

module.exports = router;