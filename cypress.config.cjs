const cypress = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor');
const browserify = require('@cypress/browserify-preprocessor');
const typescript = require('typescript');

module.exports = cypress.defineConfig({
    // numTestsKeptInMemory: 0,
    env: {
        uncaughtCypressException: false,
        hideXhr: true,
    },
    chromeWebSecurity: false,
    retries: {
        runMode: 1,
        openMode: 0,
    },
    e2e: {
        // baseUrl: 'http://localhost:3000',
        setupNodeEvents(on) {
            const options = {
                ...browserify.defaultOptions,
                typescript,
            };

            on('file:preprocessor', cucumber.default(options));
        },
        specPattern: 'cypress/tests/**/*.{feature,features}',
    },
});
