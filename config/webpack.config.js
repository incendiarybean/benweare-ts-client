const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

require("dotenv").config();

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        path: path.join(__dirname, "../build/"),
        publicPath: "/",
    },
    resolve: {
        alias: {
            "@common": path.resolve(__dirname, "../src/common"),
            "@components": path.resolve(__dirname, "../src/components"),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: [".ts", ".tsx", ".js", ".json"],
                },
                use: "ts-loader",
            },
            {
                test: /\.(sass|css)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(webp)$/i,
                exclude: /node_modules/,
                loader: "file-loader",
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        proxy: {
            "/api": {
                target: "http://dev.benweare.co.uk",
                changeOrigin: true,
                logLevel: "debug", // this what you want
            },
        },
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: "./public/index.html",
        // }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        }),
    ],
};
