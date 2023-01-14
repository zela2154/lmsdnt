/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')
/*******************************/
/*** Définition du modèle Payement */

module.exports = (sequelize) => {
   return Payement = sequelize.define("Payement", {
        payement_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        payement_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        admin_revenue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        instructor_revenue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        instructor_payement_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        }
    }, {
        timestamps: true,
        createdAt: "date_added",
        updatedAt: "last_modified"
    })
}