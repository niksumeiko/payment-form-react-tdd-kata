function getTestMethodName({ callee }) {
    switch (callee.type) {
        case 'CallExpression':
            return callee.callee.object ? callee.callee.object.name : callee.callee.name;
        case 'Identifier':
            return callee.name;
        case 'MemberExpression':
            return callee.object.name;
        default:
            return false;
    }
}

module.exports = {
    getTestMethodName,
};
