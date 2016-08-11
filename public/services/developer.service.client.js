(function () {
    angular
        .module("WebAppMakerApp")
        .factory("DeveloperService", developerService);

    function developerService($http) {
        var api = {
            createDeveloper: createDeveloper,
            findAllDevelopers: findAllDevelopers,
            findDeveloperByUsername: findDeveloperByUsername
        };
        return api;

        function findDeveloperByUsername(username) {
            $http.get("/api/developer/" + username);
        }

        function createDeveloper(developer) {
            return $http.post("/api/developer", developer);
        }

        function findAllDevelopers() {
            // return a promise
            return $http.get("/api/developer");
        }
    }
})();
