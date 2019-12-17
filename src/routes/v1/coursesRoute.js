const routesHelper = require('../routesHelper');
const routePath = '/courses';
const coursesHandler = require('../../handlers/v1/courses/coursesHandler');


module.exports = {
    routes : [
        /**
         * Returns a list of courses
         */
        routesHelper.createRouteAPI(routesHelper.methods.GET, routePath, coursesHandler.getAll),
        /**
         * Add a new courses
         */
        routesHelper.createRouteAPI(routesHelper.methods.POST, routePath, coursesHandler.add),
        /**
         * Remove a course specifying the id of the element to be removed
         */
        routesHelper.createRouteAPI(routesHelper.methods.DELETE, routePath + "/{id}", coursesHandler.remove),
        /**
         * Find a course by its id
         */
        routesHelper.createRouteAPI(routesHelper.methods.GET, routePath + "/{id}", coursesHandler.find),
        /**
         * Search all courses by the name
         */
        routesHelper.createRouteAPI(routesHelper.methods.GET, routePath + "/search", coursesHandler.search)

    ]
}