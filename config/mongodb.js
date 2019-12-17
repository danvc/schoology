/**
 * Set the database connection to be initiate somewhere in the app
 */
const mongoose = require('mongoose');
// defines the connection string according the environment
const connectionString = process.env.MONGO_DB || 'mongodb://localhost:27017/schoologydb';
/**
 * Establishes a connectiion with Mongodb
 */
async function connectDB() {
    // defines that the indexes should be created when added to the schema (inside each model)
    mongoose.set('useCreateIndex', true)

    await mongoose.connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
        console.log('DB connected on: ' + connectionString)
    }).catch((error) => {
        console.log('Failed to connect on DB: ' + connectionString);
        throw error;
    });
}

module.exports = connectDB