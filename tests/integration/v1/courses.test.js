const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../../lib/server');

describe('GET /api/v1/courses', () => {
    let server;

    beforeEach(async() => {
        server = await init();
    });

    afterEach(async() => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/v1/courses',
        });
        console.log(res.result);
        expect(res.statusCode).to.equal(200);
    })
})