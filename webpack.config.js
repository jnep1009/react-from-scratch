const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // use this to keep create and update html file.

module.exports = {
    entry: './app/index.js',
    output: {
        // resolve the specific directory -> resolve to root directory/dist
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    module:{
        // use to transform JSX to JS, preprocessor CSS (SASS, LESS) to CSS
        // webpack will go check babel preset in package.json
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test:  /\.(css)$/, use: ['style-loader', 'css-loader']}
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        // create html template
        template: 'app/index.html'
    })]
};