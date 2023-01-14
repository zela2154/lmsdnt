/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')
/*******************************/
/*** Définition du modèle Role */
const validateRole = ['Admin', 'Instructor', 'Student'];
module.exports = (sequelize) => {
   return Role = sequelize.define("Role", {
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
           /* get() {
            return this.getDataValue('role').split(',')    
           },
           set(role) {
               this.setDataValue('role', role.join())
           },
           validate: {
               ifTypesValid(value) {
                   if (!value) {
                       throw new Error('Un utilisateur doit avoir un role')
                   }
                   if (value.split(',').length > 1) {
                       throw new Error("Un utilisateur ne peut pas avoir plus d'un role")
                   }
                   value.split(',').forEach(role => {
                       if (!validateRole.includes(role)) {
                         throw new Error(`Le role d'un utilisateur doit appartenir à la liste suivante: ${validateRole}`)
                       }
                   });
               }
           }*/
        }
    },{
        timestamps: true,
        createdAt: "date_added",
        updatedAt: "last_modified"
   })
}