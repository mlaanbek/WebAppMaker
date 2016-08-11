(function () {
    angular
        .module("WebAppMakerApp")
        // if the controllers are simple, it's ok to declare them in the same file
        .controller("DeveloperListController", developerListController)
        .controller("NewDeveloperController", newDeveloperController);

    function developerListController() {
        var vm = this;
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
})();