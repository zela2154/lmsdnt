/****Importation des modules nécessaires */

const bcrypt = require('bcrypt')

const DB = require('../db.config')

const Course = DB.Course
const Section = DB.Section
const Category = DB.Category
const Rating = DB.Rating
const Sequelize = DB.sequelize;

//const { Sequelize } = require('sequelize');

/***********************/
/***** Routage de la ressource cours ******/

exports.getAllCourses = (req, res) => {
    let query;
switch (req.query.sort) {
  case 'best':
       query = {
            include: [
                {
                    model: Rating,
                    attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avg_rating']],
                },
            ],
            
            limit: 10
    };

    break;
    case 'last':
        query = {
        include: [
                {
                model: Rating,
                attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avg_rating'],
                    [Sequelize.fn('SUM', Sequelize.col('rating')), 'sum_rating']],
                group: ['Rating.course_id']
                },
            ],
        order: [['date_added', 'DESC']],
        limit:10

    };
    break;
  // ... autres cas de tri ...
  default:
    // Si aucun tri n'est spécifié, utilisez la requête par défaut
    query = {};
    break;
}

Course.findAll(query)
  .then(courses => {
    const mapCourses = courses.map(elem => {
      elem.outcomes = JSON.parse(elem.outcomes)
      elem.requirements = JSON.parse(elem.requirements);
      return elem;
    })
    res.json({ data: mapCourses })
  })
  .catch(err => res.status(500).send({message: "Database error", error: err}))

}

exports.getBestCourses = async (req, res) => {
 Rating.findAll({
     attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avg_rating'],
         [Sequelize.fn('SUM', Sequelize.col('rating')), 'sum_rating'],
         [Sequelize.fn('COUNT', Sequelize.col('Rating.course_id')), 'num_rating']
     ],
    group: ['Rating.course_id'],
    order: [[Sequelize.literal('avg_rating'), 'DESC']],
    limit:10,
    include: [{
      model: Course,
      required: true,
    }]
  })
.then(courses => {
    let courseData = courses.map(elem => {
        elem.Course.outcomes = JSON.parse(elem.Course.outcomes)
      elem.Course.requirements = JSON.parse(elem.Course.requirements);
      return elem;
    });
    res.status(200).json({ data: courseData });
  })
  .catch(err => {
    res.status(500).json({ error: err });
    console.log(err)
  });

};





exports.getCourse = async (req, res) => {
    let coursId = parseInt(req.params.id)

    /***Vérification si le champ id est présent et cohérent */
    if (!coursId) {
        return res.status(500).json({ message: "Mauvais paramétre"})
    }

    try {
        // Récupération du cours et vérificaion
        let cours = await Course.findOne({
            where: { course_id: coursId }, include: [
                { model: Section },
                { model: Category, attributes: ['name'] },
                {model: Rating, attributes:['rating']}
            ]
        })
        if (cours === null) {
            return res.status(404).json({message: "Le cours demandé n'existe pas.Réessayez avec un autre identifiant"})
        }
        cours.outcomes= JSON.parse(cours.outcomes)
        cours.requirements= JSON.parse(cours.requirements)
        return res.json({ data: cours })
    } catch (err) {
        return res.status(500).json({message: "Database error", error: err})
    }
}

exports.addCourse = async (req, res) => {
    const { title,
			short_description,
			description,
			language_id,
            category_id,
            outcomes,
            requirements,
			price,
			discounted_price,
			level,
			user_id,
			thumbnail,
			video_url,
			visibility,
			is_top_course,
			is_admin,
			status,
			course_overview_provider,
			is_free_course,
			date_added,
			last_update} = req.body

    // Validation des données reçues
    if (!title || !short_description || !language_id || !category_id || !user_id) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si le cours existe déjà
        const cours = await Course.findOne({ where: { title: title }, raw: true })
        /*if (cours !== null) {
            return res.status(409).json({ message: `Le cours ${title} existe déjà !` })
        }*/

        
        // Céation de l'utilisateur
        //let coursc = await Course.create(req.body)
        const coursc = await Course.create({
            title,
			short_description,
			description,
			language_id,
            category_id,
            outcomes: JSON.stringify(outcomes),
            requirements: JSON.stringify(requirements),
			price,
			discounted_price,
			level,
			user_id,
			thumbnail,
			video_url,
			visibility,
			is_top_course,
			is_admin,
			status,
			course_overview_provider,
			is_free_course,
			date_added,
			last_update
        })
        //coursc.outcomes=JSON.stringify(coursc.outcomes)
        //coursc.requirements=JSON.stringify(coursc.requirements)
        return res.json({ message: "Le cours a été bien créé", data: coursc })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: "Le cours n'a pas pu être créé.Rééssayez dans quelques instants!", error: err })
        }
              
    }
}


exports.updateCourse = async (req, res) => {
    let coursId = parseInt(req.params.id)

    if (!coursId) {
        return res.status(500).json({ message: "Mauvais paramétre !"})
    }

    try {
        let cours = await Course.findOne({ where: { course_id: coursId }, raw: true })
        if (cours === null) {
            return res.status(404).json({ message:"Ce cours n'existe pas!"})
        }

        //Mise à jour du cours
        await Course.update(req.body, { where: { course_id: coursId } })
        return res.json({message: "Le cours a été bien modifié", data: cours})
    } catch(err) {
        return res.status(500).json({message:"Le cours n'a pas pu être modifié.Réessayez dans quelques instants.", error:err})
    }
}

exports.deleteCourse =  (req, res) => {
    let coursId = parseInt(req.params.id)

    //Vérification si le champ id est présent ou cohérent
    if (!coursId) {
        return res.status(400).json({message:"Mauvais paramétre"})
    }

    Course.destroy({ where: { course_id: coursId }, force: true })
        .then(_ => res.status(204).json({ message: "Le cours a été supprimé avec success!" }))
        .catch(err => res.status(500).json({message:"Le cours n'a pas pu être supprimé.Réessayez dans quelques instants.", error: err}))
}


exports.addCourseRating = async (req, res) => {
    const { course_id, rating, user_id} = req.body

    // Validation des données reçues
    if (!course_id || !rating || !user_id) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si le cours existe déjà
        const rating = await Rating.findOne({ where: { course_id: course_id, user_id: user_id }, raw: true })
        if (rating !== null) {
            return res.status(409).json({ message: `La note  existe déjà !` })
        }

        
        // Céation de l'utilisateur
        //let coursc = await Course.create(req.body)
        const ratingc = await Rating.create(req.body);
        return res.json({ message: "La note a été bien créé", data: ratingc })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: "La note n'a pas pu être créé.Rééssayez dans quelques instants!", error: err })
        }
              
    }
}

exports.updateCourseRating = async (req, res) => {
  let courseId = parseInt(req.params.id);
  let userId = parseInt(req.body.userId); // Récupérer l'ID de l'utilisateur à partir de la requête
  let rating = parseInt(req.body.rating); // Récupérer la nouvelle note à partir de la requête

  if (!courseId || !userId || !rating) {
    return res.status(500).json({ message: 'Mauvais paramètre !' });
  }

  try {
    // Vérifier si le cours existe
    let course = await Course.findOne({ where: { course_id: courseId }, raw: true });
    if (course === null) {
      return res.status(404).json({ message: "Ce cours n'existe pas !" });
    }

    // Vérifier si l'utilisateur a déjà noté ce cours
    let existingRating = await Rating.findOne({ where: { course_id: courseId, user_id: userId }, raw: true });
    if (existingRating === null) {
      // Si l'utilisateur n'a pas encore noté ce cours, ajouter une nouvelle entrée à la table Rating
      await Rating.create({ course_id: courseId, user_id: userId, rating: rating });
    } else {
      // Si l'utilisateur a déjà noté ce cours, mettre à jour la note
      await Rating.update({ rating: rating }, { where: { course_id: courseId, user_id: userId } });
    }

    return res.json({ message: "Le cours a été bien modifié", data: course });
  } catch (err) {
    return res.status(500).json({ message: "Le cours n'a pas pu être modifié. Réessayez dans quelques instants.", error: err });
  }
};
