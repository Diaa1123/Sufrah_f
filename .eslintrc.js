// ==============================================================================
// Sufrah Theme - ESLint Configuration
// ==============================================================================
// ESLint configuration for JavaScript code quality and consistency

module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  extends: [
    'eslint:recommended',
  ],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  globals: {
    // Salla global variables
    salla: 'readonly',
    Salla: 'readonly',

    // Theme-specific globals
    SufrahSettings: 'writable',

    // Third-party libraries
    anime: 'readonly',
    Swiper: 'readonly',
    fsLightbox: 'readonly',
    Swal: 'readonly',

    // Build tools
    __webpack_public_path__: 'writable',
  },

  rules: {
    // Possible Errors
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',
    'no-alert': 'warn',
    'no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    'no-undef': 'error',
    'no-var': 'error',
    'prefer-const': 'warn',

    // Best Practices
    'eqeqeq': ['error', 'always', { null: 'ignore' }],
    'curly': ['error', 'all'],
    'dot-notation': 'warn',
    'no-else-return': 'warn',
    'no-empty-function': 'warn',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-return-await': 'warn',
    'no-throw-literal': 'error',
    'no-useless-return': 'warn',
    'prefer-promise-reject-errors': 'error',
    'require-await': 'warn',
    'yoda': 'error',

    // ES6
    'arrow-body-style': ['warn', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': 'error',
    'no-duplicate-imports': 'error',
    'no-useless-constructor': 'warn',
    'object-shorthand': 'warn',
    'prefer-arrow-callback': 'warn',
    'prefer-destructuring': ['warn', {
      array: false,
      object: true,
    }],
    'prefer-template': 'warn',
    'template-curly-spacing': 'error',

    // Stylistic
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': 'error',
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': 'error',
    'eol-last': 'error',
    'func-call-spacing': 'error',
    'indent': ['error', 2, {
      SwitchCase: 1,
      ignoredNodes: ['TemplateLiteral'],
    }],
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'linebreak-style': ['error', 'unix'],
    'max-len': ['warn', {
      code: 120,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    }],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'semi': ['error', 'always'],
    'semi-spacing': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    }],
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    'spaced-comment': ['error', 'always', {
      markers: ['/'],
    }],
  },

  overrides: [
    // Webpack configuration files
    {
      files: ['webpack.config.js', 'postcss.config.js', 'tailwind.config.js'],
      rules: {
        'no-undef': 'off',
      },
    },

    // Restaurant-specific files
    {
      files: ['src/assets/js/restaurant/**/*.js'],
      rules: {
        // Restaurant feature files may have specific patterns
        'max-len': ['warn', { code: 140 }],
      },
    },

    // Helper files
    {
      files: ['src/assets/js/helpers/**/*.js'],
      rules: {
        // Helpers can be more lenient with function length
        'max-len': 'off',
      },
    },
  ],

  ignorePatterns: [
    'node_modules/',
    'public/',
    'dist/',
    '*.min.js',
    'src/assets/js/twilight.js',
  ],
};
