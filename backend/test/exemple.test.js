
'use strict';
require('./config');
/*const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('API tests', () => {
  it('should return a list of users', (done) => {
    chai.request(app)
      .get('/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return a single user', (done) => {
    chai.request(app)
      .get('/users/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});*/



const test = require('unit.js');
const  User  = require('../src/models/user')(sequelize);

const { createUser } = require('./helpers');


describe('Users', function() {
  before(function(done) {
    beforeConnexion(done);
  });

  after(function(done) {
    afterConnexion(done);
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
      .expect('Content-Type', /json/)
      .expect(200);

    let user = res.body;
   

    user.should.be.an.Object();
    user.user_id.should.be.ok;
    user.user_id.should.be.ok;
    // Mysql ID should be 24 chars
    user.user_id.length.should.be.equal(24);
    user.first_name.should.equal('prénom user');
    user.last_name.should.equal('nom user');
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
      

    test
      .string(user.createdAt)
      .bool(user.createdAt <= Date.now)

      .string(user.updatedAt)
      .isEqualTo(user.createdAt)
    ;
  });

  /*it('should update an user', async function() {
    let createdUser = await createUser();

    const res = await test
      //.httpAgent(apiUrl)
      .httpAgent(apiUrl)
      .put('/users/' + createdUser.user_id)
      .send({first_name: 'prénom user modifié', last_name: 'nom user modifié',email:'ousmane2154@gmail.com',password:'ousmanearn',social_links:'facebook modifié',
          biography: 'biographie user modifié', role_id: 1, wishlist: 1, title: 'good modifié', paypal_key: 'ous2133',
          verification_code: 'ous2133', status: 1
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    let user = res.body;

    user.should.be.an.Object();
    // Mysql ID should be 24 chars
    user.user_id.length.should.be.equal(24);
    user.first_name.should.equal('prénom user modifié');
    user.last_name.should.equal('nom user modifié');
    user.password.should.equal('ousmanearn');
    user.email.should.equal('ousmane2154@gmail.com');
    user.social_links.should.equal('facebook modifié');
    user.biography.should.equal('biographie user modifié');
    user.role_id.should.equal(1);
    user.wishlist.should.equal('1');
    user.title.should.equal('good modifié');
    user.paypal_key.should.equal('ous2133');
    user.verification_code.should.equal('ous2133');
    user.status.should.equal(1);
    test.assert(user.createdAt < user.updatedAt);
    test.assert(createdUser.updatedAt !== user.updatedAt);
  });

it('should delete an user', async function() {
    let createdUser = await createUser();

    const res = await test
      .httpAgent(apiUrl)
      .delete('/users/' + createdUser.user_id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    let user = res.body;

    user.should.be.an.Object();
    // Mysql ID should be 24 chars
    user.user_id.length.should.be.equal(24);
    user.first_name.should.equal(createdUser.first_name);
    user.last_name.should.equal(createdUser.last_name);
    user.password.should.equal(createdUser.password);
    user.email.should.equal(createdUser.email);
    user.social_links.should.equal(createdUser.social_links);
    user.biography.should.equal(createdUser.biography);
    user.role_id.should.equal(createdUser.role_id);
    user.wishlist.should.equal(createdUser.wishlist);
    user.title.should.equal(createdUser.title);
    user.paypal_key.should.equal(createdUser.paypal_key);
    user.verification_code.should.equal(createdUser.verification_code);
    user.status.should.equal(createdUser.status);

    let foundUser = await User.findById(createdUser.user_id);

    test.assert(!foundUser);
  });*/

  it('should list all users', async function() {
    let createdUser = await createUser();
    let res = await test
      .httpAgent(apiUrl)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200);

    // With Unit.js
    test
      .array(res.body)
      .hasLength(1)

      .object(res.body[0])
      .hasProperty('user_id', createdUser.user_id)
      .hasProperty('first_name',createdUser.first_name)
      .hasProperty('last_name',createdUser.last_name)
      .hasProperty('password',createdUser.password)
      .hasProperty('email',createdUser.email)
      .hasProperty('social_links',createdUser.social_links)
      .hasProperty('biography',createdUser.biography)
      .hasProperty('role_id',createdUser.role_id)
      .hasProperty('wishlist',createdUser.wishlist)
      .hasProperty('title',createdUser.title)
      .hasProperty('paypal_key',createdUser.paypal_key)
      .hasProperty('verification_code',createdUser.verification_code)
      .hasProperty('status',createdUser.status)

    // With Should.js
    /*res.body.length.should.be.equal(1);

    let article = res.body[0];

    article.id.should.equal(createdArticle.id);
    article.title.should.equal(createdArticle.title);
    article.content.should.equal(createdArticle.content);*/
  });

  /*it('should show one article', async function() {
    let createdArticle, article, res;

    createdArticle = await createArticle();
    createdArticle.id.should.be.String();
    // Mongo ID should be 24 chars
    createdArticle.id.length.should.be.equal(24);

    res = await test
      .httpAgent(apiUrl)
      .get('/articles/' + createdArticle.id)
      .expect('Content-Type', /json/)
      .expect(200);

    article = res.body;
    article.id.should.be.equal(createdArticle.id);
    article.title.should.be.equal(createdArticle.title);
    article.content.should.be.equal(createdArticle.content);
  });*/
});
