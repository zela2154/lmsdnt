/****Importation des modules nécessaires */

const bcrypt = require('bcrypt')


const DB = require('../db.config')

const Lesson = DB.Lesson

/***********************/
/***** Routage de la ressource cours ******/

exports.getAllLessons = (req, res) => {
    Lesson.findAll()
        .then(lessons => res.json({ data: lessons }))
        .catch(err => res.status(500).send({message: "Database error", error: err}))
}

exports.getLesson = async (req, res) => {
    let lessonId = parseInt(req.params.id)

    /***Vérification si le champ id est présent et cohérent */
    if (!lessonId) {
        return res.status(500).json({ message: "Mauvais paramétre"})
    }

    try {
        // Récupération de la leçon et vérificaion
        let lesson = await Lesson.findOne({ where: { lesson_id: lessonId } })
        if (lesson === null) {
            return res.status(404).json({message: "La leçon demandée n'existe pas.Réessayez avec un autre identifiant"})
        }
        return res.json({ data: lesson })
    } catch (err) {
        return res.status(500).json({message: "Database error", error: err})
    }
}

exports.addLesson = async (req, res) => {
    const { title, duration, course_id, section_id, lesson_type} = req.body

    // Validation des données reçues
    if (!title || !duration || !course_id || !section_id || !lesson_type) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si la leçon existe déjà
        const lesson = await Lesson.findOne({ where: { title: title }, raw: true })
        if (lesson !== null) {
            return res.status(409).json({ message: `La leçon ${title} existe déjà !` })
        }

        
        // Céation de le leçon
        let lessonc = await Lesson.create(req.body)
        return res.json({ message: "La leçon a été bien créée", data: lessonc })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: "La leçon n'a pas pu être créée.Rééssayez dans quelques instants!", error: err })
        }
              
    }
}


exports.updateLesson = async (req, res) => {
    let lessonId = parseInt(req.params.id)

    if (!lessonId) {
        return res.status(500).json({ message: "Mauvais paramétre !"})
    }

    try {
        let lesson = await Lesson.findOne({ where: { lesson_id: lessonId }, raw: true })
        if (lesson === null) {
            return res.status(404).json({ message:"Cette leçon n'existe pas!"})
        }

        //Mise à jour de la leçon
        await Lesson.update(req.body, { where: { lesson_id: lessonId } })
        return res.json({message: "La leçon a été bien modifiée", data: lesson})
    } catch(err) {
        return res.status(500).json({message:"La leçon n'a pas pu être modifiée.Réessayez dans quelques instants.", error:err})
    }
}

exports.deleteLesson =  (req, res) => {
    let lessonId = parseInt(req.params.id)

    //Vérification si le champ id est présent ou cohérent
    if (!lessonId) {
        return res.status(400).json({message:"Mauvais paramétre"})
    }

    Lesson.destroy({ where: { lesson_id: lessonId }, force: true })
        .then(_ => res.status(204).json({ message: "La leçon a été supprimée avec success!" }))
        .catch(err => res.status(500).json({message:"La  leçon n'a pas pu être supprimée.Réessayez dans quelques instants.", error: err}))
}