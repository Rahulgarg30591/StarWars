/* eslint-disable no-console */
import {argv} from 'yargs';

import gulp from 'gulp';
import express from 'express';
import compression from 'compression';
import webpackConfig from '../webpack.config';
import path from 'path';
import webpack from 'webpack';
import bodyParser from 'body-parser';

import attachLoginAPI from '../server/API/loginAPI';
import attachSearchAPI from '../server/API/searchAPI';

// If gulp was called in the terminal with the --prod flag, set the node environment to production
if (argv.prod) {
    process.env.NODE_ENV = 'production';
}
let PROD = process.env.NODE_ENV === 'production';

// Running server.
gulp.task('startServer', () => {
    const app = express();
    let compiler = {};

    if (PROD) {
        compiler = webpack(webpackConfig.prod);
    } else {
        compiler = webpack(webpackConfig.dev);
    }

    const port = 4000;
    const baseDir = PROD ? 'build': 'dist';

    if (PROD) {
        app.use(require('webpack-dev-middleware')(compiler, {
            noInfo: true, publicPath: webpackConfig.prod.output.publicPath,
        }));
        app.use(require('webpack-hot-middleware')(compiler));
        app.use(compression());
    }
    else {
        app.use(require('webpack-dev-middleware')(compiler, {
            noInfo: true, publicPath: webpackConfig.dev.output.publicPath,
        }));
        app.use(require('webpack-hot-middleware')(compiler));
    }

    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true }));

    // Opening up API ports.
    attachLoginAPI(app);
    attachSearchAPI(app);

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../', baseDir, '/StarWars.html'));
    });

    app.listen(port, () => {
        console.log('Listening on 4000...');
    });
});
