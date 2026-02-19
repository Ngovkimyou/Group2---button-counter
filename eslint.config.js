import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
  js.configs.recommended,

  // TypeScript rules (no type-checking needed for basic lint)
  ...tseslint.configs.recommended,

  // Svelte rules
  ...svelte.configs["flat/recommended"],

  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".svelte"],
      },
    },
  },

  {
  languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  {
    ignores: [
      ".svelte-kit/**",
      "build/**",
      "dist/**",
      "node_modules/**",
    ],
  },
];
