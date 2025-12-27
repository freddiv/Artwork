// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // Your custom configs here
  // Add your custom rules or overrides here, but do not specify parser or parserOptions
  {
    rules: {
      quotes: ["error", "single"],
      indent: ["error", 2],
    },
  }
);
