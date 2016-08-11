// web service will listen for the client

module.exports = function (app, developerModel) {
    app.post("/api/developer", createDeveloper);
    app.get("/api/developer", findAllDevelopers);
    app.get("/api/developer/:username", findDeveloperByUsername);
    
    function findDeveloperByUsername(req, res) {
        developerModel
            .findDeveloperByUsername(req.params.username)
            .then(
                function (developer) {
                    res.json(developer);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllDevelopers(req, res) {
        developerModel
            .findAllDevelopers()
            .then(
                function (developers) {
                    res.json(developers);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createDeveloper(req, res) {
        
        // for .body to work we need to install body-parser and multer to package.json
        var developer = req.body;
        developerModel
            .createDeveloper(developer)
            .then(
                function (developer) {
                    res.json(developer);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}
