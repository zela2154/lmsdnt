/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const roleCtrl = require('../controllers/role')
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
/*** Routage de la ressource Role */
router.get('/', checkTokenMiddleware, roleCtrl.getAllRoles)
router.get('/:id', checkTokenMiddleware, roleCtrl.getRole)
router.put('/', checkTokenMiddleware, roleCtrl.addRole)
router.patch('/:id', checkTokenMiddleware, roleCtrl.updateRole)
router.delete('/:id', checkTokenMiddleware, roleCtrl.deleteRole)

module.exports = router;