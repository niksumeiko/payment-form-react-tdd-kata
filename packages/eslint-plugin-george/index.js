/** Custom George rules */
const noVagueTitlesRule = require('./lib/rules/no-vague-titles.js');
const noMultipleRenderMethods = require('./lib/rules/react-no-multiple-render-methods.js');
const jsxNoTernary = require('./lib/rules/jsx-no-ternary.js');
const noAllMocksMethods = require('./lib/rules/no-all-mocks-methods.js');
const noUnnamedDynamicImports = require('./lib/rules/no-unnamed-dynamic-imports.js');
const importNoAbsoluteWithinModule = require('./lib/rules/import-no-absolute-within-module.js');
const importFeaturesMockFirst = require('./lib/rules/import-features-mock-first.js');
const jsxNoInlineStyles = require('./lib/rules/jsx-no-inline-styles.js');
const noDevLog = require('./lib/rules/no-dev-log.js');
const noSrcInPackages = require('./lib/rules/no-src-in-packages.js');
const noExternalImportInLuna = require('./lib/rules/no-ext-in-luna-import.js');
const noIndexInPackage = require('./lib/rules/no-index-in-package.js');
const noAbsoluteAliasForPackages = require('./lib/rules/no-absolute-alias-for-packages.js');

/** Custom George configs */
const baseConfig = require('./configs/base');
const typescriptConfig = require('./configs/typescript');
const reactConfig = require('./configs/react');
const cypressConfig = require('./configs/cypress');
const jestConfig = require('./configs/jest');
const prettierConfig = require('./configs/prettier');

module.exports = {
    rules: {
        'no-vague-titles': noVagueTitlesRule,
        'react-no-multiple-render-methods': noMultipleRenderMethods,
        'jsx-no-ternary': jsxNoTernary,
        'no-dev-log': noDevLog,
        'jsx-no-inline-styles': jsxNoInlineStyles,
        'jest-no-all-mocks-methods': noAllMocksMethods,
        'import-no-absolute-within-module': importNoAbsoluteWithinModule,
        'no-unnamed-dynamic-imports': noUnnamedDynamicImports,
        'import-features-mock-first': importFeaturesMockFirst,
        'no-src-in-packages': noSrcInPackages,
        'no-ext-in-luna-import': noExternalImportInLuna,
        'no-index-in-package': noIndexInPackage,
        'no-absolute-alias-for-packages': noAbsoluteAliasForPackages,
    },
    configs: {
        base: baseConfig,
        typescript: typescriptConfig,
        react: reactConfig,
        cypress: cypressConfig,
        jest: jestConfig,
        prettier: prettierConfig,
    },
};
