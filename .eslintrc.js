module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/prop-types": "warn",
    "react/react-in-jsx-scope": "off",
    "no-unused-var": "off",
    "no-unused-vars": "warn",
    "no-undef": "warn",
    "no-import-assign": "warn",
    "no-empty": "warn",
  },
};
