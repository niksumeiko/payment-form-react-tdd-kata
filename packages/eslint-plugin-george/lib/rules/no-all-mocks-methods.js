const isInvalidMocks = (name) =>
    ['resetAllMocks', 'clearAllMocks', 'restoreAllMocks', 'resetModules'].some(
        (method) => method === name,
    );

module.exports = {
    meta: {
        docs: {
            description: 'Disallows jest allMocks methods.',
            category: 'Best Practices',
        },
        messages: {
            allMocksMethod:
                'Do not use {{method}} or related methods that are not explicit to a single mock. Instead, clear, reset and restore mocks individually.',
        },
    },

    create(context) {
        return {
            Identifier(node) {
                if (isInvalidMocks(node.name)) {
                    context.report({
                        node,
                        messageId: 'allMocksMethod',
                        data: { method: node.name },
                    });
                }
            },
        };
    },
};
