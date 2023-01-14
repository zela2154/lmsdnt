/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')


/*******************************/
/*** Définition du modèle Langage */
module.exports = (sequelize) =>{
   return Language = sequelize.define("Language", {
    language_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            ms: "La langue exise déjà!"
        }
    }
});

}

