module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "brace-style": ["warn", "1tbs"],
    "semi": ["error", "always"],
    "quotes": ["warn", "double", {"avoidEscape": true} ],
    "@typescript-eslint/no-inferrable-types": ["warn", {"ignoreParameters": true} ],
  }
}