import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';


import apiRouter from '../backend/api.js';
import mainRouter from '../frontend/routes/main.js';

export async function init (app) {
    app.engine("hbs",
        engine({
            extname: "hbs",
            defaultLayout: false
        })
    );
    app.set('trust proxy', 1);
    app.set("view engine", "hbs");    
    app.set('views','./frontend/views');
    app.disable('x-powered-by');
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(cookieParser());

    app.use('/', express.static('frontend/public'));
    app.use('/api', apiRouter);
    app.use('/', mainRouter);
    return app;
}
