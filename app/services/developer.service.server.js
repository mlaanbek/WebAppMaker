// web service will listen for the client

module.exports = function (app, developerModel) {
    app.post("/api/developer", createDeveloper);

    function createDeveloper(req, res) {

    }
}
