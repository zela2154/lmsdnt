/****Importation des modules nécessaires */

const DB = require('../db.config')

const Currency = DB.Currency

/***********************/
/***** Routage de la ressource langue ******/

exports.getAllCurrencies = (req, res) => {
    Currency.findAll()
        .then(currencies => res.json({message:"La liste des devise a bien été récupérée!", data: currencies }))
        .catch(err => res.status(500).send({message: "Database error", error: err}))
}

exports.getCurrency = async (req, res) => {
    let currencyId = parseInt(req.params.id)

    /***Vérification si le champ id est présent et cohérent */
    if (!currencyId) {
        return res.status(500).json({ message: "Mauvais paramétre"})
    }

    try {
        // Récupération de la devise et vérificaion
        let currency = await Currency.findOne({ where: { currency_id: currencyId } })
        if (currency === null) {
            return res.status(404).json({message: "La devise demandée n'existe pas.Réessayez avec un autre identifiant"})
        }
        return res.json({ data: currency })
    } catch (err) {
        return res.status(500).json({message: "Database error", error: err})
    }
}

exports.addCurrency = async (req, res) => {
    const { name, code, symbole } = req.body

    // Validation des données reçues
    if (!name || !code || symbole) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si la devise existe déjà
        const currency = await Currency.findOne({ where: { name: name }, raw: true })
        if (currency !== null) {
            return res.status(409).json({ message: `La devise ${name} existe déjà !` })
        }

        

        // Céation de la devise
        let currencyc = await Currency.create(req.body)
        return res.json({ message: "La devise a été bien créée", data: currencyc })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
      //  res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}


exports.updateCurrency = async (req, res) => {
    let currencyId = parseInt(req.params.id)

    if (!currencyId) {
        return res.status(500).json({ message: "Mauvais paramétre !"})
    }

    try {
        let currency = await Currency.findOne({ where: { currency_id: currencyId }, raw: true })
        if (currency === null) {
            return res.status(404).json({ message:"Cette devise n'existe pas!"})
        }

        //Mise à jour de la devise
        await Currency.update(req.body, { where: { currency_id: currencyId } })
        return res.json({message: "La devise a été bien modifiée", data: currency})
    } catch(err) {
        return res.status(500).json({message:"La devise n'a pas pu être modifiée.Réessayez dans quelques instants.", error:err})
    }
}

exports.deleteCurrency =  (req, res) => {
    let currencyId = parseInt(req.params.id)

    //Vérification si le champ id est présent ou cohérent
    if (!currencyId) {
        return res.status(400).json({message:"Mauvais paramétre"})
    }

    Currency.destroy({ where: { currency_id: currencyId }, force: true })
        .then(_ => res.status(204).json({ message: "La devise a été supprimée avec success!" }))
        .catch(err => res.status(500).json({message:"La devise n'a pas pu être supprimée.Réessayez dans quelques instants.", error: err}))
}