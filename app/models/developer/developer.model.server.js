var mongoose = required("mongoose");

module.exports = function () {
    var DeveloperSchema = require("./developer.schema.server.js")();

    // create the model from the schema
    var Developer = mongoose.model("Developer", DeveloperSchema);
};
