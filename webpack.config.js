// webpack.config.js

const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        js: './public/javascripts/src/main.js',
    },

    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public')
    },

    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
        },
        {
            test: /\.js$/,
            exclude : /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    }
};