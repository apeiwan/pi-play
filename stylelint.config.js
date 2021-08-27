module.exports = {
  plugins: ['stylelint-scss'],
  extends: [
    '@vant/stylelint-config',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
};
