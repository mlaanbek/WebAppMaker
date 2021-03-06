(function () {
    angular
        .module("WebAppMakerApp")
        // if the controllers are simple, it's ok to declare them in the same file
        .controller("DeveloperListController", developerListController)
        .controller("NewDeveloperController", newDeveloperController)
        .controller("EditDeveloperController", editDeveloperController);

    function developerListController(DeveloperService) {
        var vm = this;

        function init() {
            DeveloperService
                .findAllDevelopers()
                .then(
                    function (developers) {
                        vm.developers = developers.data;
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }
        // gets called when the controller is invoked
        init();
    }
    
    function newDeveloperController(DeveloperService, $location) {
        var vm = this;
        vm.createDeveloper = createDeveloper;

        function createDeveloper(developer) {
            DeveloperService
                .createDeveloper(developer) // responds immediately with a service
                .then(
                    function (developer) {
                        vm.developer = developer;
                        $location.url("/developer");
                    },
                    function (error) {
                        vm.error = error;
                    }
                )
        }
    }

    function editDeveloperController(
        $routeParams, DeveloperService, $location) {

        var username = $routeParams.username;
        var vm = this;
        vm.updateDeveloper = updateDeveloper;
        vm.deleteDeveloper = deleteDeveloper;

        function init() {
            DeveloperService
                .findDeveloperByUsername(username)
                .then(
                    function (response) {
                        vm.developer = response.data;
                    },
                    function (error) {
                        vm.error = error;
                    }
                );
        }
        init();
        
        function deleteDeveloper(developer) {
            DeveloperService
                .deleteDeveloper(developer)
                .then(
                    function (response) {
                        $location.url("/developer");
                    },
                    function (err) {
                        vm.error = err;
                    }
                );    
        }

        function updateDeveloper(developer) {
            DeveloperService
                .updateDeveloper(developer)
                .then(
                    function (response) {
                        $location.url("/developer");
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }
    }
})();
