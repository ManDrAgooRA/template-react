import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist", "build", "node_modules", "eslint.config.js"] },
  {
    extends: [
      pluginJs.configs.recommended,
      js.configs.recommended,
      ...tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
      eslintPluginPrettier,
      importPlugin.flatConfigs.recommended,
    ],
    files: ["src/**/*.{ts,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": "error",
      "no-undef": "error",
      "react/react-in-jsx-scope": "off",
      "capitalized-comments": "error",
      "import/no-unresolved": "off",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "type", "object"],
          pathGroups: [
            {
              pattern: "@pages/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@components/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@hooks/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@constants/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@utils/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "./*.module.scss",
              group: "type",
              position: "after",
            },
            {
              pattern: "**/*.scss",
              group: "type",
              position: "after",
            },
            {
              pattern: "**/*.css",
              group: "type",
              position: "after",
            },
            {
              pattern: "./*.module.scss",
              group: "sibling",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
    },
  },
);
