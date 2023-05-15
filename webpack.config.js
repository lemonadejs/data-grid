const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = (env, argv) => {
    const prod_config = {
        target: ['web', 'es5'],
        entry: {
            index: './src/index.js'
        },
        mode: 'production',
        output: {
            library: {
                name: 'Datagrid',
                type: 'umd',
                export: ['default']
            },
            globalObject: 'this',
            filename: '[name].js'
        },
        externals: {
            lemonadejs: 'lemonadejs'
        },
        plugins: [],
        optimization: {
            minimize: true
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                }
            ]
        },
        stats: { warnings: false }
    }

    const dev_config = {
        target: 'web',
        entry: './src/index.js',
        mode: 'development',
        optimization: {
            minimize: false
        },
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        devServer: {
            // contentBase
            static: {
                directory: path.join(__dirname, '/')
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
            },
            port: 3005,
            devMiddleware: {
                publicPath: 'https://localhost:3000/dist/'
            },
            hot: 'only'
        },
        stats: { warnings: false }
    }

    if (argv.mode === 'production') {
        prod_config.plugins.push(
            new MiniCssExtractPlugin({
                filename: 'style.css'
            })
        )
    }

    return argv.mode === 'production' ? prod_config : dev_config
}
