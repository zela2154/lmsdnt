/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')
/*******************************/
/*** Définition du modèle message_thread */
module.exports = (sequelize) => {
  return Messagethread =  sequelize.define("Message_thread", {
        message_thread_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        message_thread_code: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        sender: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        receiver: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        last_message_timestamp: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        }
    })
}