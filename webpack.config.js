var HtmlWebpackPlugin = require("html-webpack-plugin"); // Require  html-webpack-plugin plugin
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var DashboardPlugin = require('webpack-dashboard/plugin');
var webpack = require("webpack");

require("dotenv").config();

module.exports = {
    entry: __dirname + "/src/app/index.js", // webpack entry point. Module to start building dependency graph
    output: {
        path: __dirname + "/dist", // Folder to store generated bundle
        filename: "bundle.js",  // Name of generated bundle after build
        publicPath: "/"
    },
    module: {  // where we defined file patterns and their loaders
        rules: [
            {
                test: /\.html/,
                loader: "raw-loader"
            },
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                query: {
                    presets: ["env", "es2015", "react", "stage-1"]
                },
                exclude: [
                    /node_modules/
                ]
            },            
            {
                // regular css files
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ["css-loader"]
                })
            },            
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: [
                        { loader: "css-loader" }, 
                        { loader: "sass-loader"}
                    ]
                })                
            }                        
        ]
    },
    plugins: [  // Array of plugins to apply to build chunk
        new HtmlWebpackPlugin({
            template: __dirname + "/src/public/index.html",
            inject: "body"
        }),
        new ExtractTextPlugin("styles.css"), // extract css to a separate file called styles.css
        new webpack.DefinePlugin({  // plugin to define global constants
            API_KEY: JSON.stringify(process.env.API_KEY)
        }),
        new DashboardPlugin()
    ],
    devServer: {  // configuration for webpack-dev-server
        contentBase: "./src/public",  //source of static assets
        port: 7700, // port to run dev-server
    } 
};