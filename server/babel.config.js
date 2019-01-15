module.exports = {
  presets: [
    ['@babel/preset-env', {
      "targets": {
        "node": "current",
      }
    }]
  ],


  plugins: [
    ['module-resolver', {
      root: ['./'],
      alias: {
        'USER': './user/',
        'MODULES': './modules/',
        'CONFIG': './config/',
      },
    }],
    "@babel/plugin-syntax-dynamic-import",
  ],
};
