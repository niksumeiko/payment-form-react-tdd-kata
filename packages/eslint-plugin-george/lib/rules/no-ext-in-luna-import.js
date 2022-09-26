const isExternalImport = (name) => name.match(/^(src|@george|@shared|@retail|@business)\/.+$/gi);
const isLunaFolder = (path) => path.match(/^.*\/?luna\/.+$/g);
const isRelativeExternalImport = (name) =>
    name.match(/^.*\.\.\/(src|shared|retail|business)\/.*$/gi);

module.exports = {
    meta: {
        docs: {
            description: 'Dont import external dependencies in luna.',
            category: 'Best Practices',
        },
        messages: {
            noExternalImportInLuna:
                'Dont import external dependencies in luna. Luna is feature-code agnostic library and should not directly depend on such code.',
        },
    },

    create(context) {
        return {
            ImportDeclaration(node) {
                if (!isLunaFolder(context.getFilename())) {
                    return;
                }
                if (
                    isExternalImport(node.source.value) ||
                    isRelativeExternalImport(node.source.value)
                ) {
                    context.report({
                        node,
                        messageId: 'noExternalImportInLuna',
                    });
                }
            },
        };
    },
};
