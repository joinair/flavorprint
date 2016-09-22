
const message =
  'Please, add empty line above first line of code (Alex will be gratefull)';

module.exports = context => ({
  Program(node) {
    const line = node.loc.start.line - 1;

    if (line === 0 || context.getSourceCode(node, 0).lines[line - 1]) {
      context.report({
        node,
        message,
        fix: fixer => {
          return fixer.insertTextBefore(node, '\n');
        },
      });
    }
  },
});
