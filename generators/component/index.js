/* eslint-disable */
const path = require('path');
const Case = require('case');
const yeoman = require('yeoman-generator');
const h = require('../../helper');

const componentNamePromptTemplate = `
Angular component’s name: "$ yo as:component button";
component will be initialized in created file app/components/button/index.js
`;

module.exports = yeoman.Base.extend({
  constructor: function () { // eslint-disable-line
    yeoman.Base.apply(this, arguments);
    this.argument('componentName', {
      type: String,
      desc: componentNamePromptTemplate
    });
  },
  writing() {
    const constants = h.getConstants(this);
    const componentName = Case.kebab(this.componentName);
    const pascalComponentName = Case.pascal(this.componentName);
    const create = (template, dest) => {
      if (dest === undefined) {
        dest = template.replace(/Component/, pascalComponentName);
      }
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(path.join(`src/components/${pascalComponentName}/`, dest)),
        { componentName, Case, constants }
      );
    };
    const files = [
      'index.js',
      'README.md',
      'Component.jsx',
      'Component.story.jsx',
      'Component.styl',
      'Component.test.js'
    ];
    files.forEach(file => create(file));
  }
});

