/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const userCtrl = require('../controllers/user')
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
/*** Routage de la ressource User */
router.get('/', checkTokenMiddleware, userCtrl.getAllUsers)
router.get('/:id', checkTokenMiddleware, userCtrl.getUser)
router.post('/', userCtrl.addUser)
router.put('/:id', checkTokenMiddleware, userCtrl.updateUser)
router.delete('/:id', checkTokenMiddleware, userCtrl.deleteUser)

module.exports = router;