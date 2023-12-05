module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "node": true,
        "es2022": true,
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
        /* gross but this codebase is in a current state of mess, so... */
        "no-constant-condition": "warn",

        "@typescript-eslint/ban-types": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern":"^_" }],
    },
    "ignorePatterns": [
        ".eslintrc.js",
        ".eslintrc.cjs",
        "webpack.config.js"
    ],
};
