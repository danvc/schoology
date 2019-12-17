const mongoose = require('mongoose');

/**
 * Course schema to be persisted in the db
 */
const modelSchema = new mongoose.Schema({
    name: { type: String, index: true, required: true},
    description: String
});

/**
 * Defines the model name and its schema
 */
module.exports = mongoose.model('Courses', modelSchema);