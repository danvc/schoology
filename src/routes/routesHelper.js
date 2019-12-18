// defines the URL path according the verion 
const apiURL = '/api/v' + (process.env.API_VERSION || '1')
/**
 * HTTP methods
 */
const methods = {
    GET   : 'GET',
    POST  : 'POST',
    PUT   : 'PUT',
    DELETE: 'DELETE',
}

/**
 * Contains all HTTP codes and its description in a way to send the properly response code
 */
const HTTPCodes = {
    /**
     * The HTTP 200 OK success status response code indicates that the request has succeeded. A 200 response is cacheable by default.
     */
    OK: 200,
    /**
     * The HTTP 201 Created success status response code indicates that the request has succeeded and has led to the creation of a resource. 
     * The new resource is effectively created before this response is sent back and the new resource is returned in the body of the message, 
     * its location being either the URL of the request, or the content of the Location header. The common use case of this status code is as the result of a POST request.
     */
    CREATED : 201,
    /**
     * The HTTP 204 No Content success status response code indicates that the request has succeeded, but that the client doesn't need to go 
     * away from its current page. A 204 response is cacheable by default. An ETag header is included in such a response.
     */
    NO_CONTENT: 204,
    /**
     * The HyperText Transfer Protocol (HTTP) 410 Gone client error response code indicates that access to the target resource is no longer 
     * available at the origin server and that this condition is likely to be permanent.
     */
    GONE: 410,
    /**
     * The HTTP 404 Not Found client error response code indicates that the server can't find the requested resource. Links which lead to a 404 
     * page are often called broken or dead links, and can be subject to link rot.
     */
    NOT_FOUND: 404
}

/**
 * Returns a new object that shapes a route
 * @param {*} method HTTP methods (GET, DELETE, POST, PATCH, etc)
 * @param {*} path Url to be called
 * @param {*} handler Action to be triggered when the method is called
 * @param {*} options Hapi options. You don't need to add the parent property `options`, only its child properties, like `validate`, for example.
 */
function createRoute(method, path, handler, options) {
    return {
        method,
        path,
        handler,
        options
    }

}

/**
 * It just calls the `createRoute` method adding the word `/api` identifying our route as an API
 * @param {*} method HTTP methods (GET, DELETE, POST, PATCH, etc)
 * @param {*} path Url to be called
 * @param {*} handler Action to be triggered when the method is called
 * @param {*} options Hapi options. You don't need to add the parent property `options`, only its child properties, like `validate`, for example.
*/
function createRouteAPI(method, path, handler, options) {
    return createRoute(method, apiURL + path, handler, options );
}

/**
 * Creates a response according the JASONAPI.org
 * @param {*} h Hapi toolki handler
 * @param {*} type Object type/model name
 * @param {*} data Object value/data
 * @param {*} id Object id
 * @param {*} path URL path to access this object
 * @param {*} statusCode HTTP code
 */
function createAPIResponse(h, type, data, id, statusCode) {
    // returns a new object in the JSONAPI.org 
    return h.response(Array.isArray(data) ? data.map(e => transformResponse(type, e, e._id)) : transformResponse(type, data, id)).code(statusCode)
}

/**
 * 
 * @param {*} type object type or model name
 * @param {*} data value, data
 * @param {*} id id of the object/data
 */
function transformResponse (type, data, id) {
    return {
        type,
        attributes: data,
        id
    }
}

module.exports = {
    methods,
    HTTPCodes,
    createRoute,
    createRouteAPI,
    createAPIResponse
}