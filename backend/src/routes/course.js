/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const courseCtrl = require('../controllers/course')
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
router.get('/', courseCtrl.getAllCourses)
router.get('/best', courseCtrl.getBestCourses)
router.get('/:id', courseCtrl.getCourse)
router.post('/', checkTokenMiddleware, courseCtrl.addCourse)
router.put('/:id', checkTokenMiddleware, courseCtrl.updateCourse)
router.delete('/:id', checkTokenMiddleware, courseCtrl.deleteCourse)
router.post('/', checkTokenMiddleware, courseCtrl.addCourseRating)
router.put('/:id', checkTokenMiddleware, courseCtrl.updateCourseRating)

module.exports = router;