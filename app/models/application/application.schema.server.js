var mongoose = require("mongoose");

module.exports = function () {
    var ApplicationSchema = mongoose.Schema({
        developerUsername: String,          // it's our foreign key

        // if many properties are defined, type must be defined explicitly
        name: {type: String, default: "Application Name"},
        description: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "application"});

    return ApplicationSchema;
}