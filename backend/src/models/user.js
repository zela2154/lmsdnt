/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

/*******************************/
/*** Définition du modèle User */

 module.exports = (sequelize) => {
   const User = sequelize.define("User", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        email: {
            type: DataTypes.STRING,
            validate: {
             isEmail: true   
            },
            allowNull: false,
            unique: {
                msg:"L'adresse email est déjà pris!"
            }
        },
        password: {
            type: DataTypes.STRING,
            is: /^[0-9a-f]{64}$/i, // Ici une contrainte
            allowNull: false
        },
        social_links: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
        biography: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        wishlist: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        paypal_key: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
        verification_code: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        }, 
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        timestamps: true,
        createdAt: "date_added",
        updatedAt: "last_modified"
   })
    
     User.beforeCreate( async (user, options) => {
        let hash = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND))
        user.password = hash
    })
    
    User.checkPassword = async (password, originel) => {
        return await bcrypt.compare(password, originel)
    }


    return User
}




