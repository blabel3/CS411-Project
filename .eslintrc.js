module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": ["eslint:recommended", 
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "@typescript-eslint/no-inferrable-types": ["warn", {"ignoreParameters": true} ],
  }
}