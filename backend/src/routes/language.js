/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const languageCtrl = require('../controllers/language')
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
/*** Routage de la ressource Langue */
router.get('/', languageCtrl.getAllLanguages)
router.get('/:id', checkTokenMiddleware, languageCtrl.getLanguage)
router.post('', checkTokenMiddleware, languageCtrl.addLanguage)
router.put('/:id', checkTokenMiddleware, languageCtrl.updateLanguage)
router.delete('/:id', checkTokenMiddleware, languageCtrl.deleteLanguage)

module.exports = router;