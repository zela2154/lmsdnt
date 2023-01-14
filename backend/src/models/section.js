/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')

/*******************************/
/*** Définition du modèle Section */

module.exports = (sequelize) => {
   return Section = sequelize.define("Section", {
        section_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        order: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    })
}