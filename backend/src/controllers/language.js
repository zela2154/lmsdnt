/****Importation des modules nécessaires */

const DB = require('../db.config')

const Language = DB.Language

/***********************/
/***** Routage de la ressource langue ******/

exports.getAllLanguages = (req, res) => {
    Language.findAll()
        .then(languages => res.json({message:"La liste des langues a bien été récupérée!", data: languages }))
        .catch(err => res.status(500).send({message: "Database error", error: err}))
}

exports.getLanguage = async (req, res) => {
    let languageId = parseInt(req.params.id)

    /***Vérification si le champ id est présent et cohérent */
    if (!languageId) {
        return res.status(500).json({ message: "Mauvais paramétre"})
    }

    try {
        // Récupération de la langue et vérificaion
        let language = await Language.findOne({ where: { language_id: languageId } })
        if (language === null) {
            return res.status(404).json({message: "La langue demandée n'existe pas.Réessayez avec un autre identifiant"})
        }
        return res.json({ data: language })
    } catch (err) {
        return res.status(500).json({message: "Database error", error: err})
    }
}

exports.addLanguage = async (req, res) => {
    const { name } = req.body

    // Validation des données reçues
    if (!name) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si la langue existe déjà
        const language = await Language.findOne({ where: { name: name }, raw: true })
        if (language !== null) {
            return res.status(409).json({ message: `La langue ${name} existe déjà !` })
        }

        

        // Céation de la langue
        let languagec = await Language.create(req.body)
        return res.json({ message: "La langue a été bien créée", data: languagec })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
      //  res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}


exports.updateLanguage = async (req, res) => {
    let languageId = parseInt(req.params.id)

    if (!languageId) {
        return res.status(500).json({ message: "Mauvais paramétre !"})
    }

    try {
        let language = await Language.findOne({ where: { language_id: languageId }, raw: true })
        if (language === null) {
            return res.status(404).json({ message:"Cette langue n'existe pas!"})
        }

        //Mise à jour de la langue
        await Language.update(req.body, { where: { language_id: languageId } })
        return res.json({message: "La langue a été bien modifiée", data: language})
    } catch(err) {
        return res.status(500).json({message:"La langue n'a pas pu être modifiée.Réessayez dans quelques instants.", error:err})
    }
}

exports.deleteLanguage =  (req, res) => {
    let languageId = parseInt(req.params.id)

    //Vérification si le champ id est présent ou cohérent
    if (!languageId) {
        return res.status(400).json({message:"Mauvais paramétre"})
    }

    Language.destroy({ where: { language_id: languageId }, force: true })
        .then(_ => res.status(204).json({ message: "La langue a été supprimé avec success!" }))
        .catch(err => res.status(500).json({message:"La langue n'a pas pu être supprimée.Réessayez dans quelques instants.", error: err}))
}