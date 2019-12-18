const db = require('./mongodb');
const CourseModel = require('../src/models/coursesModel');
const total = 1000;
/**
 * Injects fake data
 */
async function makeFakeData() {
    await db();
    var faker = require('faker');
    var i = 0;
    console.log('Generating ' + total + ' ' + CourseModel.modelName);
    while (i < 1000) {
        try {
            var course = {name: faker.company.catchPhrase(), description: faker.company.catchPhraseDescriptor()};
            await new CourseModel(course).save();
            console.log(i + 1, 'Adding: ', course);
        } catch (error) {
            console.log(error);
        }
        i++;
    }    
    process.exit();
}

makeFakeData();
