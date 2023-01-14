/****Importation des modules nécessaires */

const DB = require('../db.config')

const Role = DB.Role

/***********************/
/***** Routage de la ressource role ******/

exports.getAllRoles = (req, res) => {
    Role.findAll()
        .then(roles => res.json({message:"La liste des roles a bien été récupérée!", data: roles }))
        .catch(err => res.status(500).send({message: "Database error", error: err}))
}

exports.getRole = async (req, res) => {
    let roleId = parseInt(req.params.id)

    /***Vérification si le champ id est présent et cohérent */
    if (!roleId) {
        return res.status(500).json({ message: "Mauvais paramétre"})
    }

    try {
        // Récupération du role et vérificaion
        let role = await Role.findOne({ where: { role_id: roleId } })
        if (role === null) {
            return res.status(404).json({message: "Le role demandé n'existe pas.Réessayez avec un autre identifiant"})
        }
        return res.json({ data: role })
    } catch (err) {
        return res.status(500).json({message: "Database error", error: err})
    }
}

exports.addRole = async (req, res) => {
    const { name } = req.body

    // Validation des données reçues
    if (!name) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si le role existe déjà
        const role = await Role.findOne({ where: { name: name }, raw: true })
        if (role !== null) {
            return res.status(409).json({ message: `Le role ${name} existe déjà !` })
        }

        

        // Céation du role
        let rolec = await Role.create(req.body)
        return res.json({ message: "Le role a été bien créé", data: rolec })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
      //  res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}


exports.updateRole = async (req, res) => {
    let roleId = parseInt(req.params.id)

    if (!roleId) {
        return res.status(500).json({ message: "Mauvais paramétre !"})
    }

    try {
        let role = await Role.findOne({ where: { role_id: roleId }, raw: true })
        if (role === null) {
            return res.status(404).json({ message:"Ce role n'existe pas!"})
        }

        //Mise à jour du role
        await Role.update(req.body, { where: { role_id: roleId } })
        return res.json({message: "Le role a été bien modifié", data: role})
    } catch(err) {
        return res.status(500).json({message:"Le role n'a pas pu être modifié.Réessayez dans quelques instants.", error:err})
    }
}

exports.deleteRole =  (req, res) => {
    let roleId = parseInt(req.params.id)

    //Vérification si le champ id est présent ou cohérent
    if (!roleId) {
        return res.status(400).json({message:"Mauvais paramétre"})
    }

    Role.destroy({ where: { role_id: roleId }, force: true })
        .then(_ => res.status(204).json({ message: "Le role a été supprimé avec success!" }))
        .catch(err => res.status(500).json({message:"Le role n'a pas pu être supprimé.Réessayez dans quelques instants.", error: err}))
}