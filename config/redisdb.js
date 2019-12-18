var redis = require('redis');
const { promisify } = require('util');
/**
 * Creates a Redis client to be distributed over the app
 */
const client = redis.createClient(process.env.REDIS_URL);
// adds a new method that allow to be working in async method
const getAsync = promisify(client.get).bind(client)

module.exports = {
    client,
    getAsync
}