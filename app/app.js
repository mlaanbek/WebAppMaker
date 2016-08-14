// the entry point to the rest of the server application

module.exports = function (app, db) {
    var developerModel = require("./models/developer/developer.model.server.js")(db);

    // we pass "app" to enable creating URLs and developerModel to talk to the DB
    var developerService = require("./services/developer.service.server.js")(app, developerModel);
    
    var applicationService = require("./services/application.service.server.js")(app);
};
