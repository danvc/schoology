const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { before, after, describe, it } = exports.lab = Lab.script();
const { init } = require('../../lib/server');

/**
 * Run tests related to the courses CRUD and methods
 */
describe('Test /api/v1/courses', () => {
    let server;

    // start a new instance of the server before any test
    before(async() => {
        server = await init();
    });

    // turn the server down
    after(async() => {
        await server.stop();
    });

    // calls the endpoing and submiting a new course making sure that the course was added
    it('Adds a new course', async () => {
        const res = await server.inject({
            method: 'POST',
            url: '/api/v1/courses',
            payload: {
                name: "Business & Management Studies",
                description: "A degree in a business-related subject strikes a balance between theoretical and practical work. Many business schools in the UK enjoy good relations with local and global businesses alike, meaning students benefit from cutting edge business techniques as well as high calibre work placements during their time at university."
            }
        });
        expect(res.statusCode).to.equal(201);
    })

    // call the endpoint to search searching for any course which contains the char "a"
    it('Search a course', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/v1/courses/search?q=a',
        });
        expect(res.result).to.be.an.array().and.not.be.length(0);
    })
})