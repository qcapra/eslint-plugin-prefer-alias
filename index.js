module.exports = {
  rules: {
    "prefer-alias-import": {
      meta: {
        docs: {
          description:
            "Restrict imports to path aliases if the relative import goes through a src subfolder",
          category: "Possible Errors",
          recommended: true
        },
        fixable: "code",
        schema: [
          {
            type: "object",
            properties: {
              folders: {
                type: "array",
                items: {
                  type: "string"
                }
              }
            }
          }
        ]
      },
      create: function (context) {
        return {
          ImportDeclaration(node) {
            const folders = context.options[0];
            const importValue = node.source.value;
            const relativePath = new RegExp(
              ".*../(" + folders.folders.join("|") + ").*"
            );
            const invalid = relativePath.test(importValue);
            const sourceCodeFiltered = context
              .getSourceCode()
              .lines.filter((line) => line.match(relativePath))
              .toString();
            const firstPartImport = sourceCodeFiltered.substring(
              0,
              sourceCodeFiltered.indexOf('"') + 1
            );
            const newImportValue = importValue.substring(
              importValue.lastIndexOf("../") + 3
            );

            if (invalid) {
              context.report({
                node,
                message: "Import path must be a path alias"
                // fix: function (fixer) {
                //   return fixer.replaceText(
                //     node,
                //     firstPartImport + "@" + newImportValue + '";'
                //   );
                // }
              });
            }
          }
        };
      }
    }
  }
};
