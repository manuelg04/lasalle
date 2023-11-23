module.exports = function(api) {
  api.cache(true);
  let plugins = [];
  
  
    plugins.push('nativewind/babel');
  

  

  

  

  return {
    presets: ['babel-preset-expo'],
    plugins: plugins,
  };
};
