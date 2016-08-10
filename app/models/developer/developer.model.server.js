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
        // the developer object will be validated against the schema; it doesn'y have to
        // have all the fields, but the ones that have must correspond to the schema

        // object to pass and a callback function
        // Node will not wait for this function to come back
        Developer.create(developer, function (err, doc) {
            console.log(doc);
        });
    }
};
