/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const lessonCtrl = require('../controllers/lesson')
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
router.get('/', lessonCtrl.getAllLessons)
router.get('/:id', lessonCtrl.getLesson)
router.post('', checkTokenMiddleware, lessonCtrl.addLesson)
router.put('/:id', checkTokenMiddleware, lessonCtrl.updateLesson)
router.delete('/:id', checkTokenMiddleware, lessonCtrl.deleteLesson)

module.exports = router;