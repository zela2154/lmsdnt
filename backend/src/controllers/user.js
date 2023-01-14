/****Importation des modules nécessaires */

const bcrypt = require('bcrypt')

const DB = require('../db.config')

const User = DB.User
const Role =DB.Role

/***********************/
/***** Routage de la ressource user ******/

exports.getAllUsers = (req, res) => {
    User.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => res.status(500).send({message: "Database error", error: err}))
}

exports.getUser = async (req, res) => {
    let userId = parseInt(req.params.id)

    /***Vérification si le champ id est présent et cohérent */
    if (!userId) {
        return res.status(500).json({ message: "Mauvais paramétre"})
    }

    try {
        // Récupération de l'utilisateur et vérificaion
        let user = await User.findOne({ where: { user_id: userId }, include:{model:Role, attributes:['name']} })
        if (user === null) {
            return res.status(404).json({message: "L'utilisateur demandé n'existe pas.Réessayez avec un autre identifiant"})
        }
        return res.json({ data: user })
    } catch (err) {
        return res.status(500).json({message: "Database error", error: err})
    }
}

/*exports.addUser = async (req, res) => {
    const { first_name, last_name, email, password, role_id} = req.body

    // Validation des données reçues
    if (!first_name || !last_name || !role_id || !email || !password) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si l'utilisateur existe déjà
        const user = await User.findOne({ where: { email: email }, raw: true })
        if (user !== null) {
            return res.status(409).json({ message: `L'email ${email} existe déjà !` })
        }

        // Hashage du mot de passe utilisateur
        // let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        // req.body.password = hash

        // Céation de l'utilisateur
        let userc = await User.create(req.body);
        //userc.role_id=1;
        console.log("pliw", userc);
        return res.json({ message: "L'utilisateur a été bien créé", data: userc })
        

    } catch(err) {
        console.log(err)
        if(err.name == 'ValidationError'){
            return res.status(400).json({ message: 'Validation Error', error: err })
        }
         if(err.name == 'SequelizeDatabaseError'){
            return res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}*/
exports.addUser = async (req, res) => {
  const { first_name, last_name, email, password, role_id } = req.body

  // Validation des données reçues
  if (!first_name || !last_name || !email || !password || !role_id) {
    return res.status(400).json({ message: 'Données manquantes' })
  }

  try {
    // Vérification si l'utilisateur existe déjà
    const user = await User.findOne({ where: { email: email }, raw: true })
    if (user !== null) {
      return res.status(409).json({ message: `L'email ${email} existe déjà !` })
    }

    // Création de l'utilisateur
    const userc = await User.create({ first_name, last_name, email, password, role_id })
    return res.json({ message: "L'utilisateur a été bien créé", data: userc })
  } catch (err) {
    console.error(err)
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Conflit de données uniques', error: err })
    }
    if (err.name === 'SequelizeDatabaseError') {
      return res.status(500).json({ message: 'Erreur de base de données', error: err })
    }
    res.status(500).json({ message: 'Erreur de traitement de l\'utilisateur', error: err })
  }
}


exports.updateUser = async (req, res) => {
    let userId = parseInt(req.params.id)

    if (!userId) {
        return res.status(500).json({ message: "Mauvais paramétre !"})
    }

    try {
        let user = await User.findOne({ where: { user_id: userId }, raw: true })
        if (user === null) {
            return res.status(404).json({ message:"Cet utilisateur n'existe pas!"})
        }

        //Mise à jour de l'utilisateur
        await User.update(req.body, { where: { user_id: userId } })
        return res.json({message: "L'utilisateur a été bien modifié", data: user})
    } catch(err) {
        return res.status(500).json({message:"L'utilisateur n'a pas pu être modifié.Réessayez dans quelques instants.", error:err})
    }
}

exports.deleteUser =  (req, res) => {
    let userId = parseInt(req.params.id)

    //Vérification si le champ id est présent ou cohérent
    if (!userId) {
        return res.status(400).json({message:"Mauvais paramétre"})
    }

    User.destroy({ where: { user_id: userId }, force: true })
        .then(_ => res.status(204).json({ message: "Utilisateur a été supprimé avec success!" }))
        .catch(err => res.status(500).json({message:"L'utilisateur n'a pas pu être supprimé.Réessayez dans quelques instants.", error: err}))
}