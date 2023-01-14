/***********************************/
/*** Import des module nécessaires */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const DB = require('../db.config')
const User = DB.User

/**********************************/
/*** Routage de la ressource Auth */

exports.login = async (req, res) => {
    const { email, password } = req.body

    // Validation des données reçues
    if(!email || !password){
        return res.status(400).json({ message: 'Mauvais email ou password'})
    }

    try{
        // Vérification si l'utilisateur existe
        let user = await User.findOne({ where: {email: email}, raw: true})
        if(user === null){
            return res.status(401).json({ message: "L'utilisateur demandé n'existe pas. !"})
        }

        // Vérification du mot de passe
        let test = await User.checkPassword(password, user.password)
        if(!test){
            return res.status(401).json({ message: 'Le mot de passe est incorrect.'})
        }

        // Génération du token et envoi
        const token = jwt.sign({
            user_id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING})
        
        return res.json({message:"L'utilisateur a été connecté avec succès", access_token: token})
    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: "L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.", error: err})        
    }
}