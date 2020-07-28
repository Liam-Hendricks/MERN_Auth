module.exports = function(app) {
    const server = require('../controller/server.controller.js');
    app.post("/api/login", server.login);
}



