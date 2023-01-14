/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')
/*******************************/
/*** Définition du modèle Question */

module.exports = (sequelize) => {
   return Question = sequelize.define("Question", {
        question_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quiz_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number_of_options: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        options: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        correct_answers: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        order: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    })
}
