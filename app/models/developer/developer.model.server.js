var mongoose = required("mongoose");

module.exports = function (db) {
    var DeveloperSchema = require("./developer.schema.server.js")();

    // create the model from the schema
    var Developer = mongoose.model("Developer", DeveloperSchema);


    // high-level api
    var api = {
        createDeveloper: createDeveloper
    };
    return api;

    function createDeveloper(developer) {

    }
};
