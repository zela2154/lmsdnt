'use strict';

//const { sequelize } = require('../../src/db.config');

require('../config.js');


const { User }  = require('../../src/models/user')(sequelize);

function createUser(user) {
  let defaultUser = {
    first_name: 'Ousmane',
    last_name: 'Diouf',
    email: 'ousmane2154@gmail.com',
    password: 'ousmanearn',
    social_links:'facebook',
    biography:'biographie user',
    role_id:1,
    wishlist:'1',
    title:'good',
    paypal_key:'ous2133',
    verification_code:'ous2133',
    status:1,
  };

  if (!user) {
    user = defaultUser;
  }

  return User.create(user);
}

module.exports = {createUser};
