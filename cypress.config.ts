import { defineConfig } from 'cypress';
import cucumber from 'cypress-cucumber-preprocessor';
import browserify from '@cypress/browserify-preprocessor';

export default defineConfig({
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
        baseUrl: 'http://localhost:3000',
        setupNodeEvents(on) {
            const options = {
                ...browserify.defaultOptions,
                typescript: require.resolve('typescript'),
            };

            on('file:preprocessor', cucumber.default(options));
        },
        specPattern: 'cypress/integration/**/*.{feature,features}',
    },
});
