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
        const course = {name: faker.company.catchPhrase(), description: faker.company.catchPhraseDescriptor()};
        console.log(i + 1, 'Adding: ', course);
        new CourseModel(course).save();
        i++;
    }    
    process.exit();
}

makeFakeData();
