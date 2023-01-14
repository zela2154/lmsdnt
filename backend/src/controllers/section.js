/****Importation des modules nécessaires */


const DB = require('../db.config')

const Section = DB.Section
const Lesson = DB.Lesson

/***********************/
/***** Routage de la ressource role ******/

exports.getAllSections = (req, res) => {
    Section.findAll()
        .then(sections => res.json({message:"La liste des sections a bien été récupérée!", data: sections }))
        .catch(err => res.status(500).send({message: "Database error", error: err}))
}

exports.getSection = async (req, res) => {
    let sectionId = parseInt(req.params.id)

    /***Vérification si le champ id est présent et cohérent */
    if (!sectionId) {
        return res.status(500).json({ message: "Mauvais paramétre"})
    }

    try {
        // Récupération de la section et vérificaion
        let section = await Section.findOne({ where: { section_id: sectionId }, include:{model:Lesson} })
        if (section === null) {
            return res.status(404).json({message: "La section demandée n'existe pas.Réessayez avec un autre identifiant"})
        }
        return res.json({ data: section })
    } catch (err) {
        return res.status(500).json({message: "Database error", error: err})
    }
}

exports.addSection = async (req, res) => {
    const {  title, course_id } = req.body

    // Validation des données reçues
    if (!title || !course_id) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si le role existe déjà
        const section = await Section.findOne({ where: { title: title }, raw: true })
        if (section !== null) {
            return res.status(409).json({ message: `La section ${title} existe déjà !` })
        }

        

        // Céation de la section
        let sectionc = await Role.create(req.body)
        return res.json({ message: "La section a été bien créée", data: sectionc })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
      //  res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}


exports.updateSection = async (req, res) => {
    let sectionId = parseInt(req.params.id)

    if (!sectionId) {
        return res.status(500).json({ message: "Mauvais paramétre !"})
    }

    try {
        let section = await Section.findOne({ where: { section_id: sectionId }, raw: true })
        if (section === null) {
            return res.status(404).json({ message:"Cette section n'existe pas!"})
        }

        //Mise à jour de la section
        await Section.update(req.body, { where: { section_id: sectionId } })
        return res.json({message: "La section a été bien modifiée", data: role})
    } catch(err) {
        return res.status(500).json({message:"La section n'a pas pu être modifiée.Réessayez dans quelques instants.", error:err})
    }
}

exports.deleteSection =  (req, res) => {
    let sectionId = parseInt(req.params.id)

    //Vérification si le champ id est présent ou cohérent
    if (!sectionId) {
        return res.status(400).json({message:"Mauvais paramétre"})
    }

    Section.destroy({ where: { section_id: sectionId }, force: true })
        .then(_ => res.status(204).json({ message: "La section a été supprimée avec success!" }))
        .catch(err => res.status(500).json({message:"La section n'a pas pu être supprimée.Réessayez dans quelques instants.", error: err}))
}