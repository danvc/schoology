/**
 * This file is just a lib which is going to be used for testing purpose 
 */
const Hapi = require('@hapi/hapi');
const routes = require('../../src/routes/routes');
const Path = require('path');
const Inert = require('inert');
// define the server settings
const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
        files: {
            relativeTo:Path.join(process.cwd(), '/app/build')
        }
    }

});


/**
 * Exports the init method to be started on every test
 */
exports.init = async () => {
    // register the Inert plugin to serve a static file (in our case.. ou react application)
    await server.register([Inert,
        {
            register: require('../../config/mongodb'),
            name:"mongodb"
        }
    ]);

    // adds the / URL for static file
    routes.push({
        method: 'GET',
        path: '/{param*}',
        handler:{
            directory: {
                path: '.',
                redirectToSlash: true
            }

        }
    });

    // add the API routes
    server.route(routes);

    await server.initialize();
    return server;
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});