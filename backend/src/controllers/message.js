/****Importation des modules nécessaires */

const DB = require('../db.config')

const Message = DB.Message

/***********************/
/***** Routage de la ressource message ******/

exports.getAllMessages = (req, res) => {
    Message.findAll()
        .then(messages => res.json({ data: messages }))
        .catch(err => res.status(500).send({message: "Database error", error: err}))
}

exports.getMessage = async (req, res) => {
    let messageId = parseInt(req.params.id)

    /***Vérification si le champ id est présent et cohérent */
    if (!messageId) {
        return res.status(500).json({ message: "Mauvais paramétre"})
    }

    try {
        // Récupération du message et vérificaion
        let messagee = await Message.findOne({ where: { message_id: messageId } })
        if (messagee === null) {
            return res.status(404).json({message: "Le message demandé n'existe pas.Réessayez avec un autre identifiant"})
        }
        return res.json({ data: messagee })
    } catch (err) {
        return res.status(500).json({message: "Database error", error: err})
    }
}

exports.addMessage = async (req, res) => {
    const { message_thread_id, message, sender} = req.body

    // Validation des données reçues
    if (!message_thread_id || !message || !sender) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si le message existe déjà
      /*  const messagee = await Message.findOne({ where: { name: name }, raw: true })
        if (category !== null) {
            return res.status(409).json({ message: `La catégorie ${name} existe déjà !` })
        }*/

        

        // Céation du message
        let messagec = await Message.create(req.body)
        return res.json({ message: "Le message a été bien créé", data: messagec })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        //res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}


exports.updateMessage = async (req, res) => {
    let messageId = parseInt(req.params.id)

    if (!messageId) {
        return res.status(500).json({ message: "Mauvais paramétre !"})
    }

    try {
        let messagee = await Message.findOne({ where: { message_id: messageId }, raw: true })
        if (messagee === null) {
            return res.status(404).json({ message:"Ce message n'existe pas!"})
        }

        //Mise à jour du message
        await Message.update(req.body, { where: { message_id: messageId } })
        return res.json({message: "Le message a été bien modifié", data: category})
    } catch(err) {
        return res.status(500).json({message:"Le message n'a pas pu être modifié.Réessayez dans quelques instants.", error:err})
    }
}

exports.deleteMessage =  (req, res) => {
    let messageId = parseInt(req.params.id)

    //Vérification si le champ id est présent ou cohérent
    if (!messageId) {
        return res.status(400).json({message:"Mauvais paramétre"})
    }

    Message.destroy({ where: { message_id: messageId }, force: true })
        .then(_ => res.status(204).json({ message: "Le message a été supprimé avec success!" }))
        .catch(err => res.status(500).json({message:"Le message n'a pas pu être supprimé.Réessayez dans quelques instants.", error: err}))
}