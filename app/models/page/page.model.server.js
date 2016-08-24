module.exports = function (applicationModel) {

    var Application = applicationModel.getMongooseModel();

    var api = {
        createPage: createPage,
        findPagesForApplication: findPagesForApplication
    };
    return api;

    function findPagesForApplication(applicationId) {
        // use select to retrieve a particular field
        return Application.findById(applicationId).select("pages");
    }

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
