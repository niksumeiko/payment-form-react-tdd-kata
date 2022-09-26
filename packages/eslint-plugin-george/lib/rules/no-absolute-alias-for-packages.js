module.exports = {
    meta: {
        docs: {
            description: `Dont use absolute path for importing packages. Use proper package alias instead.`,
            category: 'Best Practices',
        },
        messages: {
            noAbsoluteAliasForPackages:
                'Dont use absolute path for importing packages. Use proper package alias instead.',
        },
        fixable: 'code',
    },

    create: function noAbsoluteAliasForPackages(context) {
        return {
            ImportDeclaration(node) {
                const importPath = node.source.value;

                if (
                    !importPath.match(/^@george\/.*$/) ||
                    !!importPath.match(/^@george\/rootSrc.*$/)
                ) {
                    return;
                }

                context.report({
                    node,
                    messageId: 'noAbsoluteAliasForPackages',
                    fix(fixer) {
                        const matchedPath = importPath.match(
                            /^@george\/([^\/]+)\/([^\/]+)(\/[^\/]+)+$/,
                        );
                        const aliasPackageImport = `'@${matchedPath[1]}/${matchedPath[2]}'`;
                        return fixer.replaceText(node.source, aliasPackageImport);
                    },
                });
            },
        };
    },
};
