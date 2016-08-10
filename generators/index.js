/* eslint-disable */
const yeoman = require('yeoman-generator');

const appNamePromptTemplate = `
Node module’s name: "$ yo as pify";
node module will be initialized in created folder
and you will be redirected to that folder
`;

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true,
      desc: appNamePromptTemplate
    });
    this.name = this.name;
  },
  method1: function () {
    console.log('method 1 just ran');
  },
  method2: function () {
    console.log('method 2 just ran');
  }
});
