const webpack = require("webpack")

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    constants: require.resolve('constants-browserify'),
    assert: require.resolve('assert/'),
    os: require.resolve('os-browserify/browser'),
    buffer: require.resolve('buffer')
  };
  config.ignoreWarnings = [
    {
      message:
        /Critical dependency: the request of a dependency is an expression/,
    },
  ];
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
    }),
]
  
  return config;
};