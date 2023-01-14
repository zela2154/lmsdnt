/****Importation des modules nécessaires */

const DB = require('../db.config')


const Payement = DB.Payement

/***********************/
/***** Routage de la ressource langue ******/

exports.getAllPayements = (req, res) => {
    Payement.findAll()
        .then(payements => res.json({message:"La liste des paiements a bien été récupérée!", data: payements }))
        .catch(err => res.status(500).send({message: "Database error", error: err}))
}

exports.getPayement = async (req, res) => {
    let payementId = parseInt(req.params.id)

    /***Vérification si le champ id est présent et cohérent */
    if (!payementId) {
        return res.status(500).json({ message: "Mauvais paramétre"})
    }

    try {
        // Récupération du payement et vérificaion
        let payement = await Payement.findOne({ where: { payement_id: payementId } })
        if (payement === null) {
            return res.status(404).json({message: "Le paiement demandé n'existe pas.Réessayez avec un autre identifiant"})
        }
        return res.json({ data: payement })
    } catch (err) {
        return res.status(500).json({message: "Database error", error: err})
    }
}

exports.addPayement = async (req, res) => {
    const { user_id, payement_type, course_id, amount } = req.body

    // Validation des données reçues
    if (!user_id || !payement_type || course_id || !amount) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si le paiement existe déjà
       /* const payement = await Payement.findOne({ where: { name: name }, raw: true })
        if (currency !== null) {
            return res.status(409).json({ message: `La devise ${name} existe déjà !` })
        }*/

        

        // Céation du paiement
        let payementc = await Payement.create(req.body)
        return res.json({ message: "Le paiement a été bien créé", data: payementc })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
      //  res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}


exports.updatePayement = async (req, res) => {
    let payementId = parseInt(req.params.id)

    if (!payementId) {
        return res.status(500).json({ message: "Mauvais paramétre !"})
    }

    try {
        let payement = await Payement.findOne({ where: { payement_id: payementId }, raw: true })
        if (payement === null) {
            return res.status(404).json({ message:"Ce paiement n'existe pas!"})
        }

        //Mise à jour du paiement
        await Payement.update(req.body, { where: { payement_id: payementId } })
        return res.json({message: "Le paiement a été bien modifié", data: currency})
    } catch(err) {
        return res.status(500).json({message:"Le paiement n'a pas pu être modifiée.Réessayez dans quelques instants.", error:err})
    }
}

exports.deletePayement =  (req, res) => {
    let payementId = parseInt(req.params.id)

    //Vérification si le champ id est présent ou cohérent
    if (!payementId) {
        return res.status(400).json({message:"Mauvais paramétre"})
    }

    Payement.destroy({ where: { payement_id: payementId }, force: true })
        .then(_ => res.status(204).json({ message: "Le paiement a été supprimé avec success!" }))
        .catch(err => res.status(500).json({message:"Le paiement n'a pas pu être supprimée.Réessayez dans quelques instants.", error: err}))
}