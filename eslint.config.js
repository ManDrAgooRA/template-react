import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    ignores: ["dist", "build", "node_modules", "eslint.config.js"],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintPluginPrettier,
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "react/react-in-jsx-scope": "off",
      "capitalized-comments": "error",
    },
  },
];
