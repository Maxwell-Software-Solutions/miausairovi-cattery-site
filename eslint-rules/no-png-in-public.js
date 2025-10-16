/**
 * Custom ESLint rule to prevent PNG images in /public/ directory (except favicon)
 */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent PNG files in /public/ directory, prefer SVG format',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      noPngInPublic: 'PNG files should not be used in /public/ directory (except favicon.png). Use SVG format instead for better performance.',
    },
  },
  create(context) {
    return {
      Literal(node) {
        if (typeof node.value === 'string') {
          const value = node.value;
          // Check for references to PNG files in /public/ (but allow favicon.png)
          if (value.includes('/public/') && value.endsWith('.png') && !value.includes('favicon.png')) {
            context.report({
              node,
              messageId: 'noPngInPublic',
            });
          }
          // Also check for direct PNG references that might be in public
          if (value.match(/^\/?[^/]+\.png$/) && !value.includes('favicon')) {
            context.report({
              node,
              messageId: 'noPngInPublic',
            });
          }
        }
      },
      TemplateElement(node) {
        const value = node.value.raw;
        if (value.includes('/public/') && value.endsWith('.png') && !value.includes('favicon.png')) {
          context.report({
            node,
            messageId: 'noPngInPublic',
          });
        }
      },
    };
  },
};
