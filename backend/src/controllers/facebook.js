const jwt = require('jsonwebtoken');
const axios = require('axios');
const DB = require('../db.config');
const User = DB.User;

exports.loginWithFacebook = async (req, res) => {
  // Récupérer le jeton d'accès Facebook depuis la requête
  const accessToken = req.body.accessToken;
  // Récupérer les informations de l'utilisateur à partir du jeton d'accès
  const userInfoResponse = await axios.get(`https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken.token}`);
  const userInfo = userInfoResponse.data;
  console.log("face-token", accessToken);
  // Récupérer l'identifiant Facebook de l'utilisateur
  //const email = userInfo.email;
  const email = userInfo.email;
  console.log("email", email);
  // Rechercher l'utilisateur dans la base de données en fonction de son identifiant Facebook
  const user = await User.findOne({ where: { email: email }});
  if (user) {
    // Si l'utilisateur existe déjà, le connecter et renvoyer un jeton JWT
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING });
    res.send({ access_token: token });
  } else {
    res.status(500).json({ message: "Erreur de connexion" });
  }
}
