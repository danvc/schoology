const routesHelper = require('../routesHelper');
const routePath = '/classes';

module.exports = {
    routes : [
        /**
         * Returns a list of classes
         */
        routesHelper.createRouteAPI(routesHelper.methods.GET, routePath + '/getAll', () => "getAll"),
        /**
         * Add a new class
         */
        routesHelper.createRouteAPI(routesHelper.methods.GET, routePath + '/add', () => "add")
    ]
}