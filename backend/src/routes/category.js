/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const categoryCtrl = require('../controllers/category')
const checkTokenMiddleware = require('../jsonwebtoken/check')

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
router.get('/', categoryCtrl.getAllCategorys)
router.get('/:id',checkTokenMiddleware, categoryCtrl.getCategory)
router.post('/',checkTokenMiddleware, categoryCtrl.addCategory)
router.put('/:id',checkTokenMiddleware, categoryCtrl.updateCategory)
router.delete('/:id',checkTokenMiddleware, categoryCtrl.deleteCategory)

module.exports = router;