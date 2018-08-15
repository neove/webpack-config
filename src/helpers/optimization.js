var { globalObjectKey, projType } = require("../constants.js");
var { useCommonChunk } = global[globalObjectKey];
module.exports = function(projectType) {
    if (!useCommonChunk)
        return {
            runtimeChunk: false,
            splitChunks: false
        };

    let runtimeChunk = {
        name: "webpack-bootstrap"
    };

    let cacheGroups = {
        styles: {
            name: 'styles',
            test: /\.s?css$/,
            chunks: 'all',
            // priority: 20,
            enforce: true,
            minSize: 0
          },
        vendors: {
            chunks: projectType === projType.spa ? "all" : "initial",
            name: "vendors",
            minChunks: 1,
            test: /[\\/]node_modules[\\/]/,
            priority: 10
        },
        default: false
    };

    if (projectType === projType.spa) {
        cacheGroups = Object.assign({}, cacheGroups, {
            common: {
                name: "common",
                minChunks: 2,
                priority: 1
            }
        });
    }

    let splitChunks = {
        minSize: 3000,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 5,
        automaticNameDelimiter: "-",
        name: true,
        cacheGroups
    };

    return {
        runtimeChunk,
        splitChunks
    }
};
