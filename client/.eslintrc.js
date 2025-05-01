module.exports = {
    // ...other existing configuration
    extends: ['next', 'next/core-web-vitals', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    rules: {
      // Disable unused variables warning/error
      '@typescript-eslint/no-unused-vars': 'off',
      
      // Disable explicit any warning/error
      '@typescript-eslint/no-explicit-any': 'off',
      
      // Other rules you may want to disable
      // '@typescript-eslint/ban-ts-comment': 'off',
      // '@typescript-eslint/no-empty-function': 'off',
    }
  };