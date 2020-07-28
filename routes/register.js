
module.exports = function(app) {
    const server = require('../controller/server.controller.js');
    app.post('/api/register', server.register);
}



