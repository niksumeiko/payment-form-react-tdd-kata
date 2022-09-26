const isPackagesFolder = (path) => path.match(/^.*\/?packages\/.+$/g);

module.exports = {
    meta: {
        docs: {
            description: `Dont import using the index file inside the package`,
            category: 'Best Practices',
        },
        messages: {
            noIndexInPackage:
                'Dont import using the index file inside the package. Use relative path instead to avoid circular dependencies.',
        },
    },

    create: function noIndexInPackage(context) {
        return {
            ImportDeclaration(node) {
                if (!isPackagesFolder(context.getFilename())) {
                    return;
                }

                const importPath = node.source.value;

                if (!!importPath.match(/^(\.\.\/?)+$/)) {
                    context.report({
                        node,
                        messageId: 'noIndexInPackage',
                    });
                }
            },
        };
    },
};
