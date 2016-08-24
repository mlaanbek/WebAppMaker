// the entry point to the rest of the server application

module.exports = function (app, db) {
    var developerModel = require("./models/developer/developer.model.server.js")(db);

    // we pass "app" to enable creating URLs and developerModel to talk to the DB
    var developerService = require("./services/developer.service.server.js")(app, developerModel);

    var applicationModel = require("./models/application/application.model.server")();
    var applicationService = require("./services/application.service.server.js")(app, applicationModel);

    // MongoDB is a document-based DB and is optimized for documents. Thus the preferred way is to
    // embedd documents inside documents instead of having references (optimal for relational DBs)
    var pageService = require("./services/page.service.server.js")(app, applicationModel);
};
