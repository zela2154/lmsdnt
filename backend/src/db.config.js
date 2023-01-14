/************************************/
/*** Import des modules nécessaires */
require('dotenv').config();
const  { Sequelize  } = require('sequelize')

const courses = require('./db/mock-course')
const users = require('./db/mock-user')
/************************************/
/*** Connexion à la base de données */
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        host: 'mariadb',
        port: '3306',
        dialect: 'mariadb',
        dialectOptions: {
        timezone: 'Etc/GMT-2',
        },
        logging: false
    }
)

/*** Mise en place des relations */
const db = {}

db.sequelize = sequelize

db.Role = require('./models/role')(sequelize)
db.User = require('./models/user')(sequelize)
db.Payement = require('./models/payement')(sequelize)
db.Enrol = require('./models/enrol')(sequelize)
db.Message = require('./models/message')(sequelize)
db.Messagethread = require('./models/message_thread')(sequelize)
db.Course = require('./models/course')(sequelize)
db.Section = require('./models/section')(sequelize)
db.Lesson = require('./models/lesson')(sequelize)
db.Question = require('./models/question')(sequelize)
db.Category = require('./models/category')(sequelize)
db.Language = require('./models/language')(sequelize)
db.Currency = require('./models/currency')(sequelize)
db.Rating = require('./models/rating')(sequelize)



db.Role.hasMany(db.User, { foreignKey: 'role_id',onDelete: 'cascade', onUpdate: 'cascade' })
db.User.belongsTo(db.Role, { foreignKey: 'role_id' })

db.User.hasMany(db.Payement, { foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' })
db.Payement.belongsTo(db.User, { foreignKey: 'user_id' })

db.Course.hasOne(db.Payement, { foreignKey: 'course_id', onDelete: 'cascade', onUpdate: 'cascade' })
db.Payement.belongsTo(db.Course, {foreignKey: 'course_id'})

db.User.hasOne(db.Enrol, { foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' })
db.Enrol.belongsTo(db.User, { foreignKey: 'user_id' })

db.User.hasMany(db.Course, { foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' })
db.Course.belongsTo(db.User, { foreignKey: 'user_id' })

db.User.hasMany(db.Payement, { foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' })
db.Message.belongsTo(db.User, { foreignKey: 'user_id' })

/*db.Messagethread.hasMany(db.Message, { foreignKey: 'message_thread_code', onDelete: 'cascade', onUpdate: 'cascade' })
db.Message.belongsTo(db.Messagethread, { foreignKey: 'message_thread_code' })*/

db.Messagethread.hasMany(db.Message, { foreignKey: 'message_thread_id', onDelete: 'cascade', onUpdate: 'cascade' })
db.Message.belongsTo(db.Messagethread, { foreignKey: 'message_thread_id' })


db.Course.hasMany(db.Section, { foreignKey: 'course_id', onDelete: 'cascade', onUpdate: 'cascade' })
db.Section.belongsTo(db.Course, {foreignKey: 'course_id'})

db.Section.hasMany(db.Lesson, { foreignKey: 'section_id', onDelete: 'cascade', onUpdate: 'cascade' })
db.Lesson.belongsTo(db.Section, { foreignKey: 'section_id' })

db.Category.hasMany(db.Course, { foreignKey: 'category_id', onDelete: 'cascade', onUpdate: 'cascade' })
db.Course.belongsTo(db.Category, { foreignKey: 'category_id' })

db.Language.hasMany(db.Course, { foreignKey: 'language_id', onDelete: 'cascade', onUpdate: 'cascade' })
db.Course.belongsTo(db.Language, { foreignKey: 'language_id' })

db.Course.hasMany(db.Rating, { foreignKey: 'course_id', onDelete: 'cascade', onUpdate: 'cascade' })
db.Rating.belongsTo(db.Course, {foreignKey: 'course_id'})

db.User.hasMany(db.Rating, { foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' })
db.Rating.belongsTo(db.User, {foreignKey: 'user_id'})










/*********************************/
/*** Synchronisation des modèles */
 /*db.sequelize.sync({ force: true}).then(_ =>{
    // console.log('Database Sync Error', err)
})*/
//db.sequelize.sync({ force: true }).then(_ => {
 /* users.map(user => {
        db.User.create({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            social_links: user.social_links,
            biography: user.biography,
            role_id: user.role_id,
            wishlist: user.wishlist,
            title: user.title,
            paypal_key: user.paypal_key,
            verification_code: user.verification_code,
            status: user.status
        })
    })*/
   /* courses.map(cours => {
        db.Course.create({
            title: cours.title,
            short_description: cours.short_description,
            description: cours.description,
            outcomes: cours.outcomes,
            requirements:cours.requirements,
            language_id:cours.language_id,
            category_id:cours.category_id,
            price:cours.price,
            discounted_price:cours.discounted_price,
            level:cours.level,
            user_id: cours.user_id,
            thumbnail:cours.thumbnail,
            video_url:cours.video_url,
            visibility:cours.visibility,
            is_top_course:cours.is_top_course,
            is_admin:cours.is_admin,
            status:cours.status,
            course_overview_provider:cours.course_overview_provider,
            is_free_course: cours.is_free_course,
        })
    })*/
    
//})

module.exports = db