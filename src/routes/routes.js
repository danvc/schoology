/**
 * This file should contain an array of routes. Each route is defined on its own file
 */
const classesRoute = require('./v1/classesRoute');
const coursesRoute = require('./v1/coursesRoute');

// maps a list of routes that is going to be added in the API router
module.exports = [].concat(classesRoute.routes, coursesRoute.routes);