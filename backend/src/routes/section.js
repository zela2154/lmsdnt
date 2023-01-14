/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const sectionCtrl = require('../controllers/section')
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
router.get('/', sectionCtrl.getAllSections)
router.get('/:id', sectionCtrl.getSection)
router.post('/', checkTokenMiddleware, sectionCtrl.addSection)
router.put('/:id', checkTokenMiddleware, sectionCtrl.updateSection)
router.delete('/:id', checkTokenMiddleware, sectionCtrl.deleteSection)

module.exports = router;