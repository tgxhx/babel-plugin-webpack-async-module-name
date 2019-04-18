module.exports = function ({ types: t }) {
  function singleModule(path, module, name) {
    if (name) {
      addComments(module, name);
    }
    path.replaceWith(t.CallExpression(t.identifier('import'), [module]));
  }

  function multipleModules(path, module, name) {
    const callArray = module.elements.map(ele => {
      if (name) {
        addComments(ele, name);
      }
      return t.CallExpression(t.identifier('import'), [ele]);
    });
    path.replaceWith(t.callExpression(t.memberExpression(t.identifier('Promise'), t.identifier('all')), [t.arrayExpression(callArray)]));
  }

  function addComments(module, name) {
    module.leadingComments = [{
      type: "CommentBlock",
      value: `webpackChunkName: '${name.value}'`
    }];
  }

  return {
    visitor: {
      CallExpression: function (path) {
        const { node } = path;
        if (t.isIdentifier(node.callee, { name: 'importName' })) {
          const module = node.arguments[0];
          const name = node.arguments[1];
          if (t.isArrayExpression(module)||t.isTemplateLiteral(module)) {
            multipleModules(path, module, name);
          } else if (t.isStringLiteral(module)) {
            singleModule(path, module, name);
          } else {
            throw new Error('The first argument of the importName() must be a string or an array.');
          }
        }
      }
    }
  };
};