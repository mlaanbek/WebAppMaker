var mongoose = require("mongoose");

module.exports = function () {

    var PageSchema = require("../page/page.schema.server.js")();

    var ApplicationSchema = mongoose.Schema({
        developerUsername: String,          // it's our foreign key

        // if many properties are defined, type must be defined explicitly
        name: {type: String, default: "Application Name"},
        description: String,
        dateCreated: {type: Date, default: Date.now},
        // basically we're saying that pages only exist inside applications, e.g composition principle
        // (deletion of the parent also leads deletion of children)
        // The other assumption we're making is thus that pages are not sharable.
        pages: [PageSchema]
    }, {collection: "application"});

    return ApplicationSchema;
};