import hyeonEslintConfig from '@hyeon/eslint-config'
import tailwind          from "eslint-plugin-tailwindcss"

export default [
  ...hyeonEslintConfig.base,
  ...hyeonEslintConfig.react,
  ...hyeonEslintConfig.typescript,
  ...hyeonEslintConfig.plus, // optional
  ...tailwind.configs["flat/recommended"],
  {
    rules: {
      camelcase: 'off',
      'lines-around-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true
        },
      ],
    },
  },
]
