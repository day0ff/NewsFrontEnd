// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter} = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'  //These are the specs that we want protractor to run. In this case, we’ll be running all the test that we have in the e2e directory and the .e2e-spec.js suffix and extension.
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true, // This tells Protractor to directly connect to the webdriver (instead of connecting to a local Selenium server
  // baseUrl: 'http://localhost:4200/',
  baseUrl: 'http://localhost:8080',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {
    }
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));
  }
};
