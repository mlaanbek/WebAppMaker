var mongoose = require("mongoose");

// a common promise library
var q = require("q");

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
        var deferred = q.defer();

        // the developer object will be validated against the schema; it doesn'y have to
        // have all the fields, but the ones that have must correspond to the schema

        // object to pass and a callback function
        // Node will not wait for this function to come back
        Developer.create(developer, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
};
