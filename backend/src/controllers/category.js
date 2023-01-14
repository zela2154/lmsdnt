/****Importation des modules nécessaires */

const DB = require('../db.config')

const Category = DB.Category

/***********************/
/***** Routage de la ressource category ******/

exports.getAllCategorys = (req, res) => {
    Category.findAll()
        .then(categorys => res.json({ data: categorys }))
        .catch(err => res.status(500).send({message: "Database error", error: err}))
}

exports.getCategory = async (req, res) => {
    let categoryId = parseInt(req.params.id)

    /***Vérification si le champ id est présent et cohérent */
    if (!categoryId) {
        return res.status(500).json({ message: "Mauvais paramétre"})
    }

    try {
        // Récupération de la catégorie et vérificaion
        let category = await Category.findOne({ where: { category_id: categoryId } })
        if (user === null) {
            return res.status(404).json({message: "La catégorie demandée n'existe pas.Réessayez avec un autre identifiant"})
        }
        return res.json({ data: category })
    } catch (err) {
        return res.status(500).json({message: "Database error", error: err})
    }
}

exports.addCategory = async (req, res) => {
    const { name, font_awesome_class} = req.body

    // Validation des données reçues
    if (!name || !font_awesome_class) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si la catégorie existe déjà
        const category = await Category.findOne({ where: { name: name }, raw: true })
        if (category !== null) {
            return res.status(409).json({ message: `La catégorie ${name} existe déjà !` })
        }

        

        // Céation de la catégorie
        let categoryc = await Category.create(req.body)
        return res.json({ message: "La catégorie a été bien créée", data: categoryc })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        //res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}


exports.updateCategory = async (req, res) => {
    let categoryId = parseInt(req.params.id)

    if (!categoryId) {
        return res.status(500).json({ message: "Mauvais paramétre !"})
    }

    try {
        let category = await Category.findOne({ where: { category_id: categoryId }, raw: true })
        if (category === null) {
            return res.status(404).json({ message:"Cette catégorie n'existe pas!"})
        }

        //Mise à jour de la catégorie
        await Category.update(req.body, { where: { category_id: categoryId } })
        return res.json({message: "La catégorie a été bien modifiée", data: category})
    } catch(err) {
        return res.status(500).json({message:"La catégorie n'a pas pu être modifiée.Réessayez dans quelques instants.", error:err})
    }
}

exports.deleteCategory =  (req, res) => {
    let categoryId = parseInt(req.params.id)

    //Vérification si le champ id est présent ou cohérent
    if (!categoryId) {
        return res.status(400).json({message:"Mauvais paramétre"})
    }

    Category.destroy({ where: { category_id: categoryId }, force: true })
        .then(_ => res.status(204).json({ message: "La catégorie a été supprimée avec success!" }))
        .catch(err => res.status(500).json({message:"La catégorie n'a pas pu être supprimée.Réessayez dans quelques instants.", error: err}))
}