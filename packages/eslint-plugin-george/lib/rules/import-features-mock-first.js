const isMockFeaturesImport = (name) => name === '@retail/testing';

module.exports = {
    meta: {
        docs: {
            description: 'Import the features mock first',
            category: 'Best Practices',
        },
        messages: {
            mockImportFirst: 'The mock import should be imported before all other absolute imports',
        },
    },

    create(context) {
        const getNumberOfEmptyLinesBetween = (currentImport, previousImport) => {
            const linesBetweenImports = context
                .getSourceCode()
                .lines.slice(previousImport.loc.end.line, currentImport.loc.start.line - 1);

            return linesBetweenImports.filter((line) => !line.trim().length).length;
        };

        const isTestFile = context.getFilename().includes('.test');

        if (!isTestFile) {
            return {};
        }

        const imported = [];

        return {
            ImportDeclaration(node) {
                imported.push(node);

                if (!isMockFeaturesImport(node.source.value)) {
                    return;
                }
                if (imported.length === 1) {
                    // there is no previous sibling import
                    return;
                }
                const currentPosition = imported.length;
                if (
                    getNumberOfEmptyLinesBetween(
                        imported[currentPosition - 1],
                        imported[currentPosition - 2],
                    ) === 0
                ) {
                    context.report({
                        node,
                        messageId: 'mockImportFirst',
                    });
                }
            },
        };
    },
};
