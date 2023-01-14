/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const messageCtrl = require('../controllers/message')
const  checkTokenMiddleware =require('../jsonwebtoken/check')

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
router.get('/', checkTokenMiddleware, messageCtrl.getAllMessages)
router.get('/:id', checkTokenMiddleware, messageCtrl.getMessage)
router.post('/', checkTokenMiddleware, messageCtrl.addMessage)
router.put('/:id', checkTokenMiddleware, messageCtrl.updateMessage)
router.delete('/:id', checkTokenMiddleware, messageCtrl.deleteMessage)

module.exports = router;