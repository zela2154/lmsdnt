/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')
/*******************************/
/*** Définition du modèle Lesson */

module.exports = (sequelize) => {
  return Lesson =  sequelize.define("Lesson", {
        lesson_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull:false
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: null
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        section_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        video_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        video_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lesson_type: {
            type: DataTypes.STRING,
            allowNull:false
        },
        attachement_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        summary: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        order: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    }, {
        timestamp: true,
        createdAt: "date_added",
        updatedAt: "last_modified"
    })
}

