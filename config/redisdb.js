var redis = require('redis');
const { promisify } = require('util');
/**
 * Creates a Redis client to be distributed over the app
 */
const client = redis.createClient(process.env.REDIS_URL);
const getAsync = promisify(client.get).bind(client)

module.exports = {
    client,
    getAsync
}