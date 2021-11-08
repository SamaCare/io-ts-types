module.exports = {
  root: true,
  extends: ["@ndhoule/eslint-config/recommended"],
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: "./tsconfig.json",
      },
      extends: [
        "@ndhoule/eslint-config/typescript",
        "@ndhoule/eslint-config/node/typescript",
      ],
    },
    {
      files: ["*.test.ts"],
      extends: ["@ndhoule/eslint-config/jest"],
      env: {
        jest: false,
      },
    },
    {
      files: ["*.config.js", ".*rc.js"],
      extends: ["@ndhoule/eslint-config/node"],
    },
  ],
};
