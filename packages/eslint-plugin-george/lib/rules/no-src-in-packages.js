const isSrcImport = (name) => name.match(/^(src|@george\/rootSrc)\/.+$/gi);
const isPackagesFolder = (path) => path.match(/^.*\/?packages\/.+$/g);
const isRelativeSrcImport = (name) => name.match(/^.*\.\.\/src\/.*$/gi);
module.exports = {
    meta: {
        docs: {
            description: 'Dont import src folder in the packages.',
            category: 'Best Practices',
        },
        messages: {
            noSrcInPackages:
                'Forbidden import from "src" that breaks packages project structure. If the import is fine, make sure the repository path doesn\'t contain folder "packages".',
        },
    },

    create(context) {
        return {
            ImportDeclaration(node) {
                if (!isPackagesFolder(context.getFilename())) {
                    return;
                }
                if (isSrcImport(node.source.value) || isRelativeSrcImport(node.source.value)) {
                    context.report({
                        node,
                        messageId: 'noSrcInPackages',
                    });
                }
            },
        };
    },
};
