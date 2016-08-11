// web service will listen for the client

module.exports = function (app, developerModel) {
    app.post("/api/developer", createDeveloper);

    function createDeveloper(req, res) {
        
        // for .body to work we need to install body-parser and multer to package.json
        var developer = req.body;
        developerModel.createDeveloper(developer);
    }
}
