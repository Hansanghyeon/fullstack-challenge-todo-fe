import hyeonEslintConfig from '@hyeon/eslint-config'
import tailwind          from "eslint-plugin-tailwindcss"

export default [
  ...hyeonEslintConfig.base,
  ...hyeonEslintConfig.react,
  ...hyeonEslintConfig.typescript,
  ...tailwind.configs["flat/recommended"],
  {
    rules: {
      camelcase: 'off',
      'lines-around-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_.*$|^_$|^P$|^flow$',
          args: 'all',
          argsIgnorePattern: '^_.*$|^_$|^P$|^flow$',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_.*$|^_$|^P$|^flow$',
          destructuredArrayIgnorePattern: '^_.*$|^_$|^P$|^flow$',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
]
