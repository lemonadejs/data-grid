const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
    const config = {
        entry: {
            main: './src/index.js',
        },
        optimization: {
            minimize: false
        },
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
        },
        externals: {
            'lemonadejs': 'lemonade'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        argv.mode === "production"
                            ? MiniCssExtractPlugin.loader
                            : "style-loader",
                        "css-loader",
                    ],
                },
            ],
        },
        plugins: [],
        stats: { warnings:false },
    };

    if (argv.mode === "production") {
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: "style.css",
            }),
        );
    }

    return config;
};
