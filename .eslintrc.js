module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    globals: {
        require: false,
        module: true,
        _: true,
        describe: false,
        expect: false,
        jest: false,
        it: false,
        Buffer: false
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [],
    "rules": {
        "curly": ["error", "multi"],
        "complexity": ["error", 6],
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "max-depth": ["error", 2],
        "max-len": ["error", 120],
        "max-params": ["error", 2],
        "max-statements": ["error", 23],
        "no-cond-assign": "off",
        "no-else-return": ["error"],
        "no-extra-parens": ["error"],
        "no-shadow": ["error"],
        "no-unneeded-ternary": ["error"],
        "no-var": ["error"],
        "quotes": ["error", "single"],
        "semi": ["error", "never"],
        "no-unused-vars": "off"
    }
};