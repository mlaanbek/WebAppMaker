var mongoose = require("mongoose");

// a common promise library
var q = require("q");

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (db) {
    var DeveloperSchema = require("./developer.schema.server.js")();

    // create the model from the schema
    var Developer = mongoose.model("Developer", DeveloperSchema);

    passport.use(new LocalStrategy(findDeveloperByCredentials));


    // high-level api
    var api = {
        createDeveloper: createDeveloper,
        findAllDevelopers: findAllDevelopers,
        findDeveloperByUsername: findDeveloperByUsername,
        updateDeveloper: updateDeveloper,
        deleteDeveloper: deleteDeveloper
    };
    return api;

    function findDeveloperByCredentials(username, password, done) {
        Developer.findOne({username: username}, function (err, developer) {

        });
    }

    function deleteDeveloper(username) {
        var deferred = q.defer();

        // .remove - if predicate is not provided, no document is removed
        Developer
            .remove(
                {username: username},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function updateDeveloper(username, developer) {
        var deferred = q.defer();

        // .update: 1) predicate to filter (if not provided, all fields will be replaced
        //          2) provide the fields, we want change (in this case we provide the all developer object, but we could be more granular
        // for example update only lastnames)
        Developer
            .update(
                {username: username},
                {$set: developer},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findDeveloperByUsername(username) {
        var deferred = q.defer();
        Developer
            .findOne(
                {username: username},
                function (err, developer) {
                    if (!err) {
                        deferred.resolve(developer);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findAllDevelopers() {
        var deferred = q.defer();

        // we use find with no predicate -> get all the developers
        Developer.find(
            function (err, developers) {
                if (!err) {
                    deferred.resolve(developers);
                } else {
                    deferred.reject(err);
                }
            }
        );

        // "I don't have the response yet but I'll let you know when I have. Don't wait for me"
        return deferred.promise;
    }

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
