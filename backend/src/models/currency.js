/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')
/*******************************/
/*** Définition du modèle Currency */
module.exports = (sequelize) => {
   return Currency = sequelize.define("Currency", {
        currency_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        symbole: {
            type: DataTypes.STRING,
            allowNull: false
        },
        paypal_supported: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaulValue:0
        }
    })
}
