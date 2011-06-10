var suite = require('api-easy').describe('api');

// starts the server.
require('../../app.js');

exports.thread = suite
    .use('localhost', 3000)
    .setHeader('Content-Type', 'application/json')
    .discuss('When using the Thread API')
        .get('/')
            .expect(200, {message: 'y halo thar'})
            .next()
        .post('/thread', {title: 'title-test', author: 'John Doe'})
            // TODO: it should actually return a 302, but it seems
            // apieasy does a POST on the url redirected to.
            .expect(404)
            .next();