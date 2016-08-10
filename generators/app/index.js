/* eslint-disable */
const R = require('ramda')
const yeoman = require('yeoman-generator')
const yosay = require('yosay')
const ifEmpty = require('if-empty')
const mkdirp = require('mkdirp')
const splitKeywords = require('split-keywords')
const Case = require('case')
require('colors')

const rejectNil = R.reject(R.isNil)

const appNamePromptTemplate = `
Node module’s name: "$ yo as myApp";
node module will be initialized in created folder
and you will be redirected to that folder
`

module.exports = yeoman.Base.extend({
  constructor: function () { // eslint-disable-line
    yeoman.Base.apply(this, arguments)
    this.argument('name', { type: String, required: false,
      desc: appNamePromptTemplate,
    })
  },
  prompting() {
    const done = this.async()

    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the ${'angular-starter'.red} generator!`))

    const questions = [{
      name: 'name',
      message: 'Ⓐ your name:',
      validate: ifEmpty('You have to provide name'),
    }, {
      name: 'email',
      message: 'Ⓐ your email:',
      validate: ifEmpty('You have to provide email'),
    }, {
      name: 'appVersion',
      message: 'Ⓐ preferred version to start:',
      default: '0.0.0',
    }, {
      name: 'appLicense',
      message: 'Ⓐ preferred license:',
      default: 'MIT',
    }, {
      name: 'appName',
      message: 'Ⓐ application name:',
      default: Case.kebab(this.name || this.appname),
      filter: Case.kebab,
    }, {
      name: 'prefix',
      message: 'Ⓐ prefix for directives:',
      default: '',
    }, {
      name: 'appDesc',
      message: 'Ⓐ description:',
    }, {
      name: 'appKeywords',
      message: 'Ⓐ keywords:',
      filter: splitKeywords,
    }, {
      name: 'withRouting',
      message: 'Ⓐ Include routing library?:',
      type: 'confirm',
      default: true,
    }]

    this.prompt(questions)
      .then(inputAnswers => {
        this.props = R.mergeAll([
          { moduleName: this.name },
          rejectNil(inputAnswers),
        ])
        done()
      })
      .catch(console.error)
  },

  writing() {
    if (this.name) {
      mkdirp(this.props.moduleName)
      this.destinationRoot(this.destinationPath(this.props.moduleName))
    }
    const create = (template, dest) => {
      if (dest === undefined) {
        dest = template // eslint-disable-line
      }
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(dest),
        this.props
      )
    }

    const mkdir = p => mkdirp(this.destinationPath(p))
    const folders = [
      '.storybook',
      'bin',
      'src',
      'static',
      'webpack',
      'api/__tests__',
      'api/actions',
      'api/actions/__tests__',
      'api/utils',
      'src/components/Title',
      'src/containers/App',
      'src/containers/Demo',
      'src/containers/DevTools',
      'src/containers/NotFound',
      'src/helpers',
      'src/redux/modules',
      'src/theme',
      'src/utils',
      'webpack'
    ]
    folders.forEach(mkdir)

    const files = [
      '.ackrc',
      '.babelrc',
      '.editorconfig',
      '.eslintignore',
      '.eslintrc',
      '.gitignore',
      'karma.conf.js',
      'package.json',
      'README.md',
      'server.babel.js',
      'tests.webpack.js',
      '.storybook/config.js',
      '.storybook/webpack.config.js',
      'api/api.js',
      'api/__tests__/.gitkeep',
      'api/actions/__tests__/.gitkeep',
      'api/actions/index.js',
      'api/actions/loadSettings.js',
      'api/utils/url.js',
      'api/api.js',
      'bin/api.js',
      'bin/server.js',
      'bin/webpack.js',
      'src/components/Title/index.js',
      'src/components/Title/Title.jsx',
      'src/components/Title/Title.story.jsx',
      'src/components/Title/Title.styl',
      'src/components/Title/Title.test.js',
      'src/components/Title/README.md',
      'src/containers/App/App.jsx',
      'src/containers/App/App.styl',
      'src/containers/App/index.js',
      'src/containers/Demo/Demo.jsx',
      'src/containers/Demo/Demo.styl',
      'src/containers/Demo/Demo.test.js',
      'src/containers/Demo/index.js',
      'src/containers/DevTools/DevTools.js',
      'src/containers/DevTools/index.js',
      'src/containers/NotFound/NotFound.jsx',
      'src/containers/NotFound/NotFound.styl',
      'src/containers/NotFound/index.js',
      'src/helpers/Html.js',
      'src/helpers/apiClient.js',
      'src/redux/create.js',
      'src/redux/modules/reducer.js',
      'src/theme/colors.styl',
      'src/theme/font-awesome.config.js',
      'src/theme/font-awesome.config.less',
      'src/theme/font-awesome.config.prod.js',
      'src/theme/optimize.js',
      'src/theme/optimize.styl',
      'src/utils/noun.js',
      'src/utils/storiesOf.js',
      'src/client.js',
      'src/config.js',
      'src/routes.js',
      'src/server.js',
      'static/favicon.ico',
      'webpack/dev.config.js',
      'webpack/prod.config.js',
      'webpack/webpack-dev-server.js',
      'webpack/webpack-isomorphic-tools.js'
    ]
    files.forEach(file => create(file.replace(/^\./, ''), file))
  },

  install() {
    this.installDependencies()
  },
})

