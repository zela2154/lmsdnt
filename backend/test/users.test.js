'use strict';
/*const chai = require('chai');
const should = chai.should();

require('./config');
const { describe, it, before, after, beforeEach } = require('mocha');
const test = require('unit.js');
const User  = require('../src/models/user')(sequelize);
const { createUser } = require('./helpers');

describe('Users', function() {
  before(function(done) {
    // setup de la connexion à la base de données
    done();
  });

  after(function(done) {
    // fermeture de la connexion à la base de données
    done();
  });

  beforeEach(function(done) {
    User
      .destroy({ where: {},force: true})
      .then(() => done())
      .catch(done);
  });

  it('should create a user', async function() {
    const res = await test
      .httpAgent(apiUrl)
      .post('/users')
      .send({first_name: 'prénom user', last_name: 'nom user',email:'ousmane2135@gmail.com',password:'Ousmanezela95',social_links:'facebook',
          biography: 'biographie user', role_id: 1, wishlist: '1', title: 'good', paypal_key: 'ous2133',
          verification_code: 'ous2133', status: 1
      })
      .set('Accept', 'application/json')
      .expect('Content-Type',/json/)
.expect(200);

let user = res.body;

user.should.be.an.Object;
user.user_id.should.exist;
// Mysql ID should be 24 chars
user.user_id.length.should.be.equal(24);
user.first_name.should.equal('prénom user');
user.lastname.should.equal('nom user');
user.password.should.equal('Ousmanezela95');
user.email.should.equal('ousmane2135@gmail.com');
user.social_links.should.equal('facebook');
user.biography.should.equal('biographie user');
user.role_id.should.equal(1);
user.wishlist.should.equal('1');
user.title.should.equal('good');
user.paypal_key.should.equal('ous2133');
user.verification_code.should.equal('ous2133');
user.status.should.equal(1);
user.createdAt.should.exist;
user.createdAt.should.be.at.most(new Date());
user.updatedAt.should.exist;
user.updatedAt.should.equal(user.createdAt);
});
});*/



const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
require('./config');
const UserModel = require('../src/models/user')(sequelize);

describe('User Model', () => {
  before(async () => {
    // setup de la connexion à la base de données
    // ...
  });

  after(async () => {
    // fermeture de la connexion à la base de données
    // ...
  });

  beforeEach(async () => {
    await UserModel.destroy({ where: {}, force: true });
  });

  it('should create a new user', async () => {
    /*const user = await UserModel.create({
      first_name: 'prénom user', last_name: 'nom user',email:'ousmane2135@gmail.com',password:'Ousmanezela95',social_links:'facebook',
          biography: 'biographie user', role_id: 1, wishlist: '1', title: 'good', paypal_key: 'ous2133',
          verification_code: 'ous2133', status: 1
    });*/
    const res = await chai
      .request(apiUrl)
      .post('/users')
      .send({first_name: 'prénom user', last_name: 'nom user',email:'ousmane2135@gmail.com',password:'Ousmanezela95',social_links:'facebook',
          biography: 'biographie user', role_id: 1, wishlist: '1', title: 'good', paypal_key: 'ous2133',
          verification_code: 'ous2133', status: 1
      })
      .set('Accept', 'application/json')
      .expect('Content-Type',/json/)
      .expect(200);

   let user = res.body;

    user.should.be.an('object');
    user.first_name.should.equal('prénom user');
    user.last_name.should.equal('nom user');
    user.email.should.equal('ousmane2135@gmail.com');
    user.password.should.equal('Ousmanezela95');
    user.social_links.should.equal('facebook');
    user.biography.should.equal('biographie user');
    user.role.should.equal(1);
    user.wishlist.should.equal('1');
    user.title.should.equal('good');
    user.paypal_key.should.equal('ous2133');
    user.verification_code.should.equal('ous2133');
    user.status.should.equal(1);
  });

  /*it('should not create a user with a duplicate email', async () => {
    await UserModel.create({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password: 'password',
      role: 'user'
    });

    try {
      await UserModel.create({
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        password: 'password',
        role: 'user'
      });
    } catch (err) {
      err.should.be.an('error');
      err.errors[0].message.should.equal('email must be unique');
    }
  });

  it('should find a user by email', async () => {
    await UserModel.create({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password: 'password',
      role: 'user'
    });

    const user = await UserModel.findOne({ where: { email: 'johndoe@example.com' } });

    user.should.be.an('object');
    user.first_name.should.equal('John');
    user.last_name.should.equal('Doe');
    user.email.should.equal('johndoe@example.com');
    user.role.should.equal('user');
  });*/
});



