const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {
    return merge(common, {
        mode: 'production',
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    enforce: "pre",
                    loader: "import-glob-loader"
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                            }
                        }, {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true,
                            }
                        }, {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                            }
                        },
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[name].css",
            }),
            new CleanWebpackPlugin()
        ],
        optimization: {
            minimize: env.minify ? true : false,
        }
    });

}
