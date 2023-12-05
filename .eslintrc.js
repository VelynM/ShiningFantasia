module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "node": true,
        "es2021": true,
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
    },
    "plugins": [
      "@typescript-eslint"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "rules": {
        // "no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern":"^_" }],

        /* gross but this codebase is in a current state of mess, so... */
        "no-constant-condition": "warn",
        "no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern":"^_" }],

        "@typescript-eslint/ban-types": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
    },
    "ignorePatterns": [".eslintrc.js", "webpack.config.js"],
};
