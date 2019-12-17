/**
 * It's the main file responsible to load and init the Server API. 
 */
'use strict';
// open a connection with the database
const connectDB = require('../config/mongodb');
const Hapi = require('@hapi/hapi');
const routes = require('./routes/routes');
const Inert = require('inert');
const Path = require('path');


const server = Hapi.server({
    // set the default values for PORT and HOST, which could be set as environment variable according the environment (PROD|TEST|DEV)
    port: process.env.HTTP_PORT || 3000,
    host: process.env.HOSTNAME || 'localhost',
    routes: {
        files: {
            
            relativeTo:Path.join(process.cwd(), '/app/build')
        }
    }
});
        

/**
 * Initializes the server (starts the caches, finalizes plugin registration) but does not start listening on the connection port.
 */
async function init() {
    await server.initialize();
    return server;
}
// export it just for tests purposes
exports.init = init;

/**
 *  Starts the server
 */
async function start() {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
}
// export it just for tests purposes
module.start = start;

const appServer = async () => {
    try {
    
        await init();

        // register the Inert plugin to serve a static file (in our case.. ou react application)
        await server.register(Inert);

        await connectDB();
        

        // we add a route for our static file
        routes.push({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: '.',
                    redirectToSlash: true
                }
            }
        });
        
        // add all routes mapped in our routes list
        server.route(routes);

        // starts the server
        await start();
        console.log('Server API running on %s', server.info.uri);

    } catch (error) {
        console.log('Something went wrong while starting the application:', error);
    } 
};

/**
 * Listener that will shutdown the app when get an `unhandledRejection`
 */
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

// starts the app
appServer();