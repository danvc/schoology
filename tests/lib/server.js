const Hapi = require('@hapi/hapi');
const routes = require('../../src/routes/routes');
const Path = require('path');
const Inert = require('inert');
const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
        files: {
            
            relativeTo:Path.join(process.cwd(), '/app/build')
        }
    }

});
    // register the Inert plugin to serve a static file (in our case.. ou react application)
    server.register(Inert);

    // adds the / URL
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

    server.events.on('log', (event, tags) => {

        if (tags.error) {
            console.log(`Server error: ${event.error ? event.error.message : 'unknown'}`);
        }
    });

exports.init = async () => {
    await server.initialize();
    return server;
};

exports.start = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});