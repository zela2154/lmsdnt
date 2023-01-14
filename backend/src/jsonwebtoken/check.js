/***********************************/
/*** Import des module nécessaires */
/*import { createRequire } from 'module';

const require = createRequire(import.meta.url);*/

const jwt = require('jsonwebtoken');
//import jwt from 'jsonwebtoken'


/*************************/
/*** Extraction du token */
const extractBearer = authorization => {

    if(typeof authorization !== 'string'){
        return false
    }

    // On isole le token
    const matches = authorization.match(/(bearer)\s+(\S+)/i)

    return matches && matches[2]

}


/******************************************/
/*** Vérification de la présence du token */
const checkTokenMiddleware = (req, res, next) => {

    const token = req.headers.authorization && extractBearer(req.headers.authorization)

    if(!token){
        return res.status(401).json({ message: "Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête. !!!"})
    }

    // Vérifier la validité du token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if(err){
            return res.status(401).json({message: "L'utilisateur n'est pas autorisé à accèder à cette ressource."})
        }

        next()
    })
}

module.exports = checkTokenMiddleware