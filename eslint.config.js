import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

export default tseslint.config(
  { ignores: ["dist", "build", "node_modules", "eslint.config.js"] },
  {
    extends: [
      pluginJs.configs.recommended,
      js.configs.recommended,
      ...tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
      eslintPluginPrettier,
    ],
    files: ["src/*.{ts,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
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
    },
  },
);
