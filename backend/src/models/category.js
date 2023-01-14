/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')

/*******************************/
/*** Définition du modèle Category */

module.exports = (sequelize) => {
  return Category = sequelize.define("Category", {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        font_awesome_class: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        createdAt: "date_added",
        updatedAt: "last_modified"
    })
}