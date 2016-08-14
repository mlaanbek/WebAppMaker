(function () {
    angular
        .module("WebAppMakerApp")
        .controller("ApplicationListController", applicationListController)
        .controller("NewApplicationController", newApplicationController);
    
    function applicationListController($routeParams) {
        var vm = this;
        vm.username = $routeParams.username;
    }
    
    function newApplicationController($routeParams, ApplicationService) {
        var vm = this;
        vm.username = $routeParams.username;
        vm.createApplication = createApplication;

        function createApplication(application) {
            application.developerUsername = vm.username;
            ApplicationService
                .createApplication(application)
                .then(
                    function (response) {
                        console.log(response.data);
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }
    }
})();
