module.exports = function (applicationModel) {

    var Application = applicationModel.getMongooseModel();

    var api = {
        createPage: createPage
    };
    return api;

    function createPage(applicationId, page) {

        // we have a promise inside promise
        return Application.findById(applicationId)
            .then(
                function (application) {
                    application.pages.push(page);
                    // save the updated application back to database
                    return application.save();
                }
            );
    }
};