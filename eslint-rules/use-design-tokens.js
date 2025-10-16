/**
 * Custom ESLint rule to enforce design tokens usage instead of hardcoded colors
 */
export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce design tokens usage instead of hardcoded color values',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      useDesignTokens: 'Use design tokens (CSS variables or Tailwind classes) instead of hardcoded color values like "{{ value }}".',
    },
  },
  create(context) {
    const colorPatterns = [
      /#[0-9a-fA-F]{3,8}\b/,  // Hex colors
      /rgb\([^)]+\)/,          // RGB colors
      /rgba\([^)]+\)/,         // RGBA colors
      /hsl\([^)]+\)/,          // HSL colors
      /hsla\([^)]+\)/,         // HSLA colors
    ];

    function checkForHardcodedColors(node, value) {
      // Skip if it's using CSS variables (e.g., hsl(var(--color)))
      if (value.includes('var(--')) {
        return;
      }

      for (const pattern of colorPatterns) {
        const match = value.match(pattern);
        if (match) {
          context.report({
            node,
            messageId: 'useDesignTokens',
            data: {
              value: match[0],
            },
          });
        }
      }
    }

    return {
      Literal(node) {
        if (typeof node.value === 'string') {
          checkForHardcodedColors(node, node.value);
        }
      },
      TemplateElement(node) {
        checkForHardcodedColors(node, node.value.raw);
      },
      Property(node) {
        // Check for style objects with color properties
        if (
          node.key.type === 'Identifier' &&
          ['color', 'backgroundColor', 'borderColor', 'fill', 'stroke'].includes(node.key.name) &&
          node.value.type === 'Literal' &&
          typeof node.value.value === 'string'
        ) {
          checkForHardcodedColors(node.value, node.value.value);
        }
      },
    };
  },
};
