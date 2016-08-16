var mongoose = require("mongoose");
var q = require("q");

module.exports = function () {
    var ApplicationSchema = require("./application.schema.server.js")();
    var Application = mongoose.model("Application", ApplicationSchema);

    var api = {
        createApplication: createApplication,
        findApplicationsForUsername: findApplicationsForUsername,
        findApplicationById: findApplicationById
    };
    return api;

    function findApplicationById(applicationId) {
        // from mongoose 4.x we don't have to use q promise
        // It does not return the application with matching application id but istead it returns a promise

        // However, it might be deprecated
        return Application.findById(applicationId);

    }
    
    function findApplicationsForUsername(username) {
        var deferred = q.defer();

        Application
            .find(
                {developerUsername: username},
                function (err, applications) {
                    if (!err) {
                        deferred.resolve(applications);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function createApplication(application) {
        var deferred = q.defer();

        Application.create(application,
            function (err, application) {
                if (!err) {
                    deferred.resolve(application);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }
};
