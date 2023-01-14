const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const DB = require('../db.config');
const User = DB.User;
const jwt = require('jsonwebtoken')

exports.loginWithGoogle = async (req, res) => {
  //req.headers.set('Authorization', `Bearer ${req.body.idToken}`);
  // Vérifier la validité du jeton d'accès Google
  console.log(req.body);
  const ticket = await client.verifyIdToken({
    idToken: req.body.idToken,
    audience: process.env.GOOGLE_CLIENT_ID,  // Replace with your client ID
  });
  const payload = ticket.getPayload();
  const email = payload['email'];
  // Rechercher l'utilisateur dans la base de données en fonction de son identifiant Google
  const user = await User.findOne({ where: { email: email }});
  if (user) {
    // Si l'utilisateur existe déjà, le connecter et renvoyer un jeton JWT
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING });
    res.send({ access_token: token });
  } else {
    // Sinon, créer un nouvel utilisateur avec son identifiant Google et le connecter
   /* const newUser = await User.create({ email: email });
    const token = jwt.sign({ userId: newUser.user_id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING });*/
      res.status(500).json({ message: "L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants."})
  }
}
