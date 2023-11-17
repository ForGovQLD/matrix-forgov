const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');


// Our function that generates our html plugins
function generateHtmlPlugins (templateDir) {
    // Read files in /html directory
    const templateFiles = fs
    .readdirSync(path.resolve(__dirname, templateDir))
    .filter(function(file){ //ignore folder
        return file.indexOf('.html') > -1
    });

    return templateFiles.map(item => {
        // Split names and extension
        const parts = item.split('.')
        const name = parts[0]
        const extension = parts[1]
        // Create new HTMLWebpackPlugin with options
        return new HtmlWebPackPlugin({
            'filename': `${name}.html`,
            'minify': false,
            'template': path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
        });
    });
}
const htmlPlugins = generateHtmlPlugins('../src/html');

// File arrays
let js_files = glob.sync('./src/modules/**/global.js') // Module JS




const copyWebPack = new CopyWebpackPlugin({
    patterns: [
        {
            from: path.resolve(__dirname,'../src/externals'),
            to: 'externals',
            globOptions: {
                ignore: ['__What is this folder for']
            }
        }
    ]
})



module.exports = {
    entry: {
        main: ['./src/index.js'].concat(js_files)
    },
    output: {
        path: path.resolve(__dirname, '../dist'), // Output folder
        filename: 'js/[name].js' // JS output path
    },
    resolve: {
        alias: {
            NodeModules: path.resolve(__dirname, '../node_modules/'),
            src: path.resolve(__dirname, '../src/')
        }
    },
    module: {
        rules: [
            { // HTML
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: false,
                        interpolate: true // allow HTML snippets with commonJs require tags
                    }
                }]
            },
            { // JavaScript and JSX only (no JSON)
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                ]
            },
            { // Images
                test: /\.(png|svg|jpg|gif)$/,                
                type: 'asset/resource',
                generator: {
                    filename: 'mysource_files/[name].[ext]'
                }
            },
            { // Font files
                test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'mysource_files/[name].[ext]'
                }
            }
        ]
    },
    plugins: htmlPlugins
        .concat(copyWebPack)
        .concat([new ESLintPlugin()]),
    optimization: {
        minimize: false,
        runtimeChunk: 'single',
    }
};
