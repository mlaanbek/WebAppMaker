// web service will listen for the client

module.exports = function (app, developerModel) {
    app.post("/api/developer", createDeveloper);
    app.get("/api/developer", findAllDevelopers);
    
    function findAllDevelopers(req, res) {
        developerModel
            .findAllDevelopers()
            .then();
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
