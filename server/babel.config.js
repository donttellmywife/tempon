module.exports = {
  presets: [
    ['@babel/preset-env', {
      'targets': {
        'node': 'current',
      }
    }]
  ],


  plugins: [
    ['module-resolver', {
      root: ['./'],
      alias: {
        'USER': './resource/user/',
        'MODULES': './module/',
        'CONFIG': './config/',
        'RESOURCE': './resource/',
      },
    }],
    '@babel/plugin-syntax-dynamic-import',
  ],
};
