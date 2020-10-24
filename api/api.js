/** third party */
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');
const acl = require('express-acl');
const fileUpload = require('express-fileupload');

/** server conf */
const config = require('../config/');
const dbService = require('./services/db.service');
const auth = require('./policies/auth.policy');
const role = require('./policies/role.policy');

// env config
const environment = process.env.NODE_ENV;

/** express app */
const app = express();
const server = http.Server(app);
// const mappedOpenRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');
const mappedAuthRoutes = mapRoutes(config.privateRoutes, 'api/controllers/');
const DB = dbService(environment, config.migrate).start();

// Cors config
app.use(cors());

// Pake helm
app.use(helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
}));

// Request body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());
// Jwt auth middleware

//app.all('/private/*', (req, res, next) => auth(req, res, next), (req, res, next) => role(req, res, next) );
app.all('/api/v1/*', (req, res, next) => auth(req, res, next));
// app.all('/api/v2/*', (req, res, next) => auth(req, res, next));

const acloptions = {
    filename: 'acl.json',
    path: 'api/policies',
    baseUrl: 'api/v1'
};
acl.config(acloptions);

app.use(acl.authorize);

// Routes
//app.use('/public', mappedOpenRoutes);
app.use('/api/v1', mappedAuthRoutes);

const conn = server.listen(config.port, () => {
    if (environment !== 'production' &&
        environment !== 'development' &&
        environment !== 'testing'
    ) {
        console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
        process.exit(1);
    }
    return DB;
});

process.on('SIGTERM', () => {
    conn.close(() => {
        console.log('Process terminated')
    })
});
