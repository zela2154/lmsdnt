/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const questionCtrl = require('../controllers/question')
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
router.get('/', checkTokenMiddleware, questionCtrl.getAllQuestions)
router.get('/:id', checkTokenMiddleware, questionCtrl.getQuestion)
router.post('/', checkTokenMiddleware, questionCtrl.addQuestion)
router.put('/:id', checkTokenMiddleware, questionCtrl.updateQuestion)
router.delete('/:id', checkTokenMiddleware, questionCtrl.deleteQuestion)

module.exports = router;