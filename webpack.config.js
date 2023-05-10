const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
    const config = {
        target: ['web', 'es5'],
        entry: {
            'index': './src/index.js',
        },
        mode: 'production',
        output: {
            library: {
                name: 'Datagrid',
                type: 'umd',
                export: [ 'default' ],
            },
            globalObject: 'this',
            filename: '[name].js',
        },
        externals: {
            lemonadejs: "lemonadejs",
        },
        plugins: [],
        optimization: {
            minimize: true
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [ MiniCssExtractPlugin.loader,
                        "css-loader"
                    ],
                },
            ],
        },
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
