// .eslintrc.cjs
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react-hooks/recommended"],
  plugins: ["react-refresh", "unused-imports"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "all",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: false,
      },
    ],
    "react-hooks/exhaustive-deps": "error",
  },
  overrides: [
    {
      files: ["**/*.jsx"],
      rules: {
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": "error",
        "react/jsx-uses-vars": "error",
        "react/jsx-uses-react": "error",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
};
