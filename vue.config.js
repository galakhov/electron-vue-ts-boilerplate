module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  pluginOptions: {
    electronBuilder: {
      // List native deps here if they don't work
      externals: ["require"],
      extraResources: ["main.js"],
      // If you are using Yarn Workspaces, you may have multiple node_modules folders
      // List them all here so that VCP Electron Builder can find them
      nodeModulesPath: ["./node_modules"],
      mainProcessTypeChecking: false, // Manually enable type checking during webpck bundling for background file.
      webpackConfig: {
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              loader: "ts-loader",
              options: {
                appendTsSuffixTo: [/\.vue$/]
              }
            }
          ]
        }
      }
    }
  }
};
