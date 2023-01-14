/****Importation des modules nécessaires */

const DB = require('../db.config')

const Question = DB.Question

/***********************/
/***** Routage de la ressource role ******/

exports.getAllQuestions = (req, res) => {
    Question.findAll()
        .then(questions => res.json({message:"La liste des questions a bien été récupérée!", data: questions }))
        .catch(err => res.status(500).send({message: "Database error", error: err}))
}

exports.getQuestion = async (req, res) => {
    let questionId = parseInt(req.params.id)

    /***Vérification si le champ id est présent et cohérent */
    if (!questionId) {
        return res.status(500).json({ message: "Mauvais paramétre"})
    }

    try {
        // Récupération de la question et vérificaion
        let question = await Question.findOne({ where: { question_id: questionId } })
        if (question === null) {
            return res.status(404).json({message: "La question demandée n'existe pas.Réessayez avec un autre identifiant"})
        }
        return res.json({ data: role })
    } catch (err) {
        return res.status(500).json({message: "Database error", error: err})
    }
}

exports.addQuestion = async (req, res) => {
    const { quiz_id, title, type, correct_answers } = req.body

    // Validation des données reçues
    if (!quiz_id || title || type || correct_answers) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si la question existe déjà
        const question = await Question.findOne({ where: { title: title }, raw: true })
        if (question !== null) {
            return res.status(409).json({ message: `La question ${title} existe déjà !` })
        }

        

        // Céation de la question
        let questionc = await Question.create(req.body)
        return res.json({ message: "La question a été bien créée", data: questionc })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
      //  res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}


exports.updateQuestion = async (req, res) => {
    let questionId = parseInt(req.params.id)

    if (!questionId) {
        return res.status(500).json({ message: "Mauvais paramétre !"})
    }

    try {
        let question = await Question.findOne({ where: { question_id: questionId }, raw: true })
        if (question === null) {
            return res.status(404).json({ message:"Cette question n'existe pas!"})
        }

        //Mise à jour de la question
        await Question.update(req.body, { where: { role_id: roleId } })
        return res.json({message: "La question a été bien modifiée", data: question})
    } catch(err) {
        return res.status(500).json({message:"La question n'a pas pu être modifiée.Réessayez dans quelques instants.", error:err})
    }
}

exports.deleteQuestion =  (req, res) => {
    let questionId = parseInt(req.params.id)

    //Vérification si le champ id est présent ou cohérent
    if (!questionId) {
        return res.status(400).json({message:"Mauvais paramétre"})
    }

    Question.destroy({ where: { question_id: roleId }, force: true })
        .then(_ => res.status(204).json({ message: "La question a été supprimée avec success!" }))
        .catch(err => res.status(500).json({message:"Le question n'a pas pu être supprimée.Réessayez dans quelques instants.", error: err}))
}