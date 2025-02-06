module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['pkg/app', 'pkg/ui', 'pkg/ui', 'app/web', 'app/native', 'tools', 'all'],
    ],
    'scope-case': [2, 'always', 'kebab-case'],
    'scope-empty': [2, 'never'],
  },
}
