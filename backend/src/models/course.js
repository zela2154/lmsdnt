/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')


/*******************************/
/*** Définition du modèle Cours */

module.exports = (sequelize) => {
    return Course = sequelize.define('Course', {
        course_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        short_description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT('long'),
            allowNull:false
        },
        outcomes: {
            type: DataTypes.TEXT,
        },
        requirements: {
           type: DataTypes.TEXT,
         },
        language_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull:false
        },
        discounted_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue:0
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        video_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        visibility: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        is_top_course: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        is_admin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        course_overview_provider: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_free_course: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        }
    },
        {
            timestamps: true,
            createdAt: "date_added",
            updatedAt: "last_update"
    })
}

   