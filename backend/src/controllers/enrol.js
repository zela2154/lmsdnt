/****Importation des modules nécessaires */

const DB = require('../db.config')

const Enrol = DB.Enrol

/***********************/
/***** Routage de la ressource inscription ******/

exports.getAllEnrols = (req, res) => {
    Enrol.findAll()
        .then(enrols => res.json({message:"La liste des inscrits a bien été récupérée!", data: enrols }))
        .catch(err => res.status(500).send({message: "Database error", error: err}))
}

exports.getEnrol = async (req, res) => {
    let enrolId = parseInt(req.params.id)

    /***Vérification si le champ id est présent et cohérent */
    if (!enrolId) {
        return res.status(500).json({ message: "Mauvais paramétre"})
    }

    try {
        // Récupération de l'inscription et vérificaion
        let enrol = await Enrol.findOne({ where: { enrol_id: enrolId } })
        if (enrol === null) {
            return res.status(404).json({message: "L'inscription demandée n'existe pas.Réessayez avec un autre identifiant"})
        }
        return res.json({ data: enrol })
    } catch (err) {
        return res.status(500).json({message: "Database error", error: err})
    }
}

exports.addEnrol = async (req, res) => {
    const { user_id, course_id } = req.body

    // Validation des données reçues
    if (!user_id || !course_id) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si la l'inscription existe déjà
        const language = await Enrol.findOne({ where: { user_id: user_id, course_id:course_id }, raw: true })
        if (language !== null) {
            return res.status(409).json({ message: `L'inscription ${user_id} existe déjà !` })
        }

        

        // Céation d'inscription
        let enrolc = await Enrol.create(req.body)
        return res.json({ message: "L'inscription a été bien créée", data: enrolc })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
      //  res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}


exports.updateEnrol = async (req, res) => {
    let enrolId = parseInt(req.params.id)

    if (!enrolId) {
        return res.status(500).json({ message: "Mauvais paramétre !"})
    }

    try {
        let enrol = await Enrol.findOne({ where: { enrol_id: enrolId }, raw: true })
        if (enrol === null) {
            return res.status(404).json({ message:"Cet inscription n'existe pas!"})
        }

        //Mise à jour d'inscription
        await Enrol.update(req.body, { where: { enrol_id: enrolId } })
        return res.json({message: "L'inscription a été bien modifiée", data: enrol})
    } catch(err) {
        return res.status(500).json({message:"L'inscription n'a pas pu être modifiée.Réessayez dans quelques instants.", error:err})
    }
}

exports.deleteEnrol =  (req, res) => {
    let enrolId = parseInt(req.params.id)

    //Vérification si le champ id est présent ou cohérent
    if (!enrolId) {
        return res.status(400).json({message:"Mauvais paramétre"})
    }

    Enrol.destroy({ where: { enrol_id: enrolId }, force: true })
        .then(_ => res.status(204).json({ message: "L'inscription a été supprimée avec success!" }))
        .catch(err => res.status(500).json({message:"L'inscription n'a pas pu être supprimée.Réessayez dans quelques instants.", error: err}))
}