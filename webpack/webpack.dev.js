const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

function reloadHtml() {
    const cache = {};
    const plugin = {
        name: 'CustomHtmlReloadPlugin'
    };
    this.hooks.compilation.tap(plugin, compilation => {
        HtmlWebPackPlugin.getHooks(compilation).afterEmit
            .tap(plugin, data => {
                const orig = cache[data.outputName];                
                const html = compilation.assets[data.outputName].source(); //resolved via: https://github.com/jantimon/html-webpack-plugin/issues/1300
                // plugin seems to emit on any unrelated change?
                if (orig && orig !== html) {
                    devServer.sockWrite(devServer.sockets, 'content-changed')
                }
                cache[data.outputName] = html
            })
    })
}


module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-source-map',
    devServer: {
        before(app, server) {
            devServer = server;
        },
        contentBase: '../dist',
        hot: true,
        host: '0.0.0.0',
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                enforce: "pre",
                loader: "import-glob-loader"
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                ]
            }
        ]
    },
    /*
    ### Hot reloading workaround:
    solution: https://www.youtube.com/watch?v=lNkVndKCum8
    src: https://github.com/webpack/webpack-dev-server/issues/2758
    // target: ['web', 'es5'],
    */
    target: "web",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        reloadHtml
    ]
});
