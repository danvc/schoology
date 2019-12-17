// Load our model schema
const CourseModel = require('../../../models/coursesModel');
const Joi = require('joi');
const boom = require('@hapi/boom');
const { createAPIResponse, HTTPCodes } = require('../../../routes/routesHelper');
const redis = require('./../../../../config/redisdb');

/**
 * Returns all elements from the list
 */
async function getAll(req, h) {
    try {
        return await createAPIResponse(h, CourseModel.modelName, await CourseModel.find({}), null, HTTPCodes.OK);
    } catch {
        return boom.internal();
    }
};

/**
 * Add a new class
 */
async function add(req, h) {
    try {
        const validationSchema = {
            name: Joi.string().min(1).required(),
            description: Joi.string().min(1).required()
        }
        const validation = Joi.validate(req.payload, validationSchema);
        // is not the payload valid?
        if (validation.error) return boom.badRequest(validation.error.details[0].message);
    
        // yes, the payload is valid
        const { name, description } = req.payload
        const course = await new CourseModel({name: name, description: description}).save();
    
        // returns the new course with the 201 code
        return createAPIResponse(h, CourseModel.modelName, course, course._id, HTTPCodes.CREATED);    
    } catch {
        return boom.internal();
    }
}

/**
 * Remove a course by its id
 */
async function remove(req, h) {
    try {
        const course = await CourseModel.findOneAndDelete({_id : req.params.id});
        let responseCode = HTTPCodes.OK;
    
        // if the course isn't available anymore
        if (!course)
            responseCode = HTTPCodes.GONE;
    
        return createAPIResponse(h, CourseModel.modelName, course, req.params.id, responseCode) 
    } catch {
        return boom.internal;
    }
}

/**
 * Find and return an element by id
 * @param {*} req 
 * @param {*} h 
 */
async function find(req, h) {
    try {
        const course = await CourseModel.findById({_id : req.params.id});
        let responseCode = HTTPCodes.OK;
    
        // if the course isn't available anymore
        if (!course)
            responseCode = HTTPCodes.NOT_FOUND;
    
        return createAPIResponse(h, CourseModel.modelName, course, req.params.id, responseCode) 
    } catch {
        return boom.internal();
    }
}

/**
 * Performs a lazy search by the name of the course
 * @param {*} req 
 * @param {*} h 
 */
async function search(req, h) {
    try {
        // if the query wasn't set
        if (!req.query.q)
            // return that the element wasn't found
            return boom.notFound();

        // prepare our query using lazy search
        const query = '.*' + req.query.q.replace(/(.)/g, "$1.*");
        
        // search it in Redis first
        const returnData = await redis.getAsync(query).then(async (data) => {
            // are there data from Redis? Return it
            if (data) return JSON.parse(data);

            // if not, get the data from database and set it in Redis
            const courses = await CourseModel.find({ name: new RegExp(query, 'i')});
            redis.client.set(query, JSON.stringify(courses))
            return courses;
        });

        return createAPIResponse(h, CourseModel.modelName, returnData, null, HTTPCodes.OK) 
    } catch {
        return boom.internal();
    }
    
}

module.exports = {
    getAll,
    add,
    remove,
    find,
    search
}