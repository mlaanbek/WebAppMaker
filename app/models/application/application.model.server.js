var mongoode = require("mongoose");
module.exports = function () {
    var ApplicationSchema = require("./application.schema.server.js")();
    var Application = mongoose.model("Application", ApplicationSchema);

    var api = {
        createApplication: createApplication
    };
    return api;

    function createApplication(application) {
        Application.create(application,
            function (err, application) {
                
            });
    }
};
