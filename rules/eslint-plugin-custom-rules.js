module.exports = {
  rules: {
    'require-file-extension-in-exports': {
      meta: {
        type: 'problem',
        docs: {
          description: 'require file extensions in export statements',
          category: 'Best Practices',
          recommended: false
        },
        schema: [] // no options
      },
      create(context) {
        return {
          ExportNamedDeclaration(node) {
            if (node.source && node.source.value.startsWith('./') && !/\.[a-z]+$/.test(node.source.value)) {
              context.report({
                node,
                message: 'Export statements must include a file extension.'
              })
            }
          }
        }
      }
    }
  }
}
