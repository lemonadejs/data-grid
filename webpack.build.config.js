const path = require('path');

module.exports = (env, argv) => {
    const config = {
        entry: './src/datagrid.js',
        optimization: {
            minimize: true
        },
        output: {
            filename: 'datagrid.js',
            path: path.resolve(__dirname, 'dist'),
        },
    };

    return config;
};