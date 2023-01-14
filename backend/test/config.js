'use strict';

/*import { createRequire } from "module";
const require = createRequire(import.meta.url);*/

require('dotenv').config();
const {Sequelize} = require('sequelize');


  let sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mariadb',
        dialectOptions: {
        timezone: 'Etc/GMT-2',
        },
        logging: false
    }
    )
 
/*const Sequelize = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});*/

const beforeConnexion = ( async (done) => {
    await sequelize.authenticate().then(() => {
    console.log('Connection to the database has been established successfully.');
    done();
  });
});

const afterConnexion = ( async (done)  => {
   await sequelize.close().then(() => {
    console.log('Connection to the database has been closed.');
    done();
  });
});

global.apiUrl = 'http://localhost:3007';
global.beforeConnexion = beforeConnexion;
global.afterConnexion = afterConnexion;
global.sequelize = sequelize;
