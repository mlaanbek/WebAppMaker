// the entry point to the rest of the server application

module.exports = function (db) {
    var developerModel = require("./models/developer/developer.model.server.js")(db);
};
