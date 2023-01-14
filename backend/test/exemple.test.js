'use strict';
require('./config');
// load Unit.js module
//const test = require('unit.js');
// const {assert} = test;

/*describe('Ma demo', function() {
  it('example devrait être une string', function() {
    // just for example of tested value
    let example = 'hello';
    // assert that example variable is a string
    test.string(example);
  });

  it('example est égale à "hello"', function() {
    // just for example of tested value
    let example = 'hello';
    // assert that example variable is a string
    test.string(example).is('hello');
    example.should.be.equal('hello');
  });
});*/

const { expect } = require('chai');
//const test = require('unit.js')
const { Language }  = require('../src/models')

describe('Language model', () => {
  it('should update a language record', async () => {
    // Créez un nouvel utilisateur
    const language = await Language.create({
      name: 'Wolof',
    });

    // Mettez à jour l'utilisateur en utilisant la méthode `update` de Sequelize
    const updatedLanguage = await Language.update({
      name: 'English'
    }, {
      where: {
        language_id: language.language_id
      }
    });

    // Vérifiez que les données de l'utilisateur ont été mises à jour correctement
    expect(updatedLanguage.name).to.equal('English');
  });
});


