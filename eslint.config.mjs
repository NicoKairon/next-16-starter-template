import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import pluginNext from "@next/eslint-plugin-next";
import globals from "globals";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "jsx-a11y": eslintPluginJsxA11y,
      "@next/next": pluginNext,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReact.configs["jsx-runtime"].rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginJsxA11y.configs.recommended.rules,
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      eqeqeq: ["error", "always"],
      "prefer-const": "error",
      "no-var": "error",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
  {
    files: [
      "src/components/**/*.{js,jsx,ts,tsx}",
      "src/features/**/*.{js,jsx,ts,tsx}",
      "src/app/**/{page,layout,loading,error,not-found,template}.tsx",
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: [
      "src/server/**/*.{js,jsx,ts,tsx}",
      "src/app/**/route.{ts,tsx}",
      "src/app/**/actions.{ts,tsx}",
    ],
    languageOptions: {
      globals: globals.node,
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
