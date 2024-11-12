const path = require('path');

module.exports = {
    mode: 'production',  // or 'development' when testing
    entry: './src/index.ts',  // Main entry file for your library
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'umd', // UMD format makes it compatible with various module systems
        globalObject: 'this',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
    },
};
