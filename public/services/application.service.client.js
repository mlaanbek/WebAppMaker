(function () {
    angular
        .module("WebAppMakerApp")
        .factory("ApplicationService", applicationService);

    function applicationService($http) {
        var api = {
            createApplication: createApplication,
            findApplicationsForUsername: findApplicationsForUsername
        };
        return api;

        function findApplicationsForUsername(application) {
            return $http.get("/api/developer/" + username + "/application");
        }
        
        function createApplication(application) {
            return $http.post("/api/developer/" + application.developerUsername + "/application", application);
        }
    }
})();
