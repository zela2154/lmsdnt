/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')

/*******************************/
/*** Définition du modèle Message */

module.exports = (sequelize) => {
   return Message = sequelize.define("Message", {
        message_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        message_thread_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        sender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timestamp: {
            type: DataTypes.TEXT('long'),
            allowNull:false
        },
        read_status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}