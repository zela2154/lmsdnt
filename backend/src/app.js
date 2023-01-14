/************************************/
/*** Import des modules nécessaires */

const express = require('express')
const cors = require('cors')
const checkTokenMiddleware = require('./jsonwebtoken/check')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')


/************************************/
/*** Import de la connexion à la DB */
let DB = require('./db.config')

/*****************************/
/*** Initialisation de l'API */
const app = express()

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))



app.use(favicon(__dirname + '/favicon.ico'))
//.use(bodyParser.json())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.json('Hello, CQP-DNT ! 👋')
})


/***********************************/
/*** Import des modules de routage */
const user_router     = require('./routes/user')
const course_router   = require('./routes/course')
const role_router     = require('./routes/role')
const lesson_router   = require('./routes/lesson')
const category_router = require('./routes/category')
const language_router = require('./routes/language')
const currency_router = require('./routes/currency')
const payement_router = require('./routes/payement')
const enrol_router    = require('./routes/enrol')
const section_router  = require('./routes/section')
const question_router = require('./routes/question')
const message_router  = require('./routes/message')
const auth_router = require('./routes/auth')
const google_login = require('./routes/google')
const facebook_login = require('./routes/facebook')

/******************************/
/*** Mise en place du routage */

app.get('/', (req, res) => res.send(`I'm online. All is OK !`))

app.use('/users', user_router)
app.use('/courses', course_router)
app.use('/roles', role_router)
app.use('/lessons', lesson_router)
app.use('/categories',  category_router)
app.use('/languages', language_router)
app.use('/currencies', currency_router)
app.use('/payements', payement_router)
app.use('/enrols', enrol_router)
app.use('/sections', section_router)
app.use('/questions', question_router)
app.use('/messages', message_router)
app.use('/auth', auth_router)
app.use('/auth',google_login)
app.use('/auth',facebook_login)


// On gère les routes 501.
app.get('*', (req, res) => res.status(501).send('Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'))



/********************************/
/*** Start serveur avec test DB */
DB.sequelize.authenticate()
    .then(() => console.log('Database connection OK'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Notre application Node est démarrée sur ${process.env.SERVER_PORT}. Good Job !`)
        })
    })
    .catch(err => console.log('Database Error', err))
