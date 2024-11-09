// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import hooksPlugin from "eslint-plugin-react-hooks";
import * as importPlugin from "eslint-plugin-import";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Still awaiting https://github.com/facebook/react/issues/28313
// /** @type {import("typescript-eslint")['configs']['strictTypeChecked']} */
/** @type {any} */
const reactHooksConfig = [
  {
    plugins: {
      "react-hooks": hooksPlugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      ...hooksPlugin.configs.recommended.rules,
    },
    ignores: ["*.test.tsx"],
  },
];

/** @type {import("typescript-eslint")['configs']['strictTypeChecked']} */
const importFlatConfig = [importPlugin.flatConfigs?.recommended, importPlugin.flatConfigs?.typescript];

export default tseslint.config(
  {
    ignores: ["dist/**", "eslint.config.js", "vite.config.ts"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...reactHooksConfig,
  ...importFlatConfig,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-confusing-void-expression": ["off"],
      "@typescript-eslint/no-empty-object-type": ["off"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    rules: {
      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          named: true,
          "newlines-between": "always",
        },
      ],
    },
  },
);
