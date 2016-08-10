var mongoose = require("mongoose");

module.exports = function () {
    var DeveloperSchema = mongoose.Schema({
        username: String,
        password: String,
        email: String,
        firstName: String,
        lastName: String
        // if collection name is not provided, mongoose chooses its own name
    }, {collection: 'developer'});
    return DeveloperSchema;
};
