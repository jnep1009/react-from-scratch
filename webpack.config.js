const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // use this to keep create and update html file.
const webpack = require('webpack');

// NODE_ENV to production so react will know to build the production mode

let config = {
    entry: './app/index.js',
    output: {
        // resolve the specific directory -> resolve to root directory/dist
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        // tell what is the main public path
        publicPath: '/'
    },
    module:{
        // use to transform JSX to JS, preprocessor CSS (SASS, LESS) to CSS
        // webpack will go check babel preset in package.json
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test:  /\.(css)$/, use: ['style-loader', 'css-loader']}
        ]
    },
    devServer:{
        // so you can access the page from different routes without going to the publicPath first -> /popular or /battle
        historyApiFallback: true
    },
    plugins: [new HtmlWebpackPlugin({
        // create html template
        template: 'app/index.html'
    })]
};

module.exports = config;