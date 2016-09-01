(function () {
    angular
        .module("WebAppMakerApp")
        .config(Configure);
    
    function Configure($routeProvider) {
        $routeProvider
            // authentication routes
            .when("/", {
                templateUrl: "views/security/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })

            // developer routes
            .when("/developer", {
                templateUrl: "views/developer/developer-list.view.html",
                controller: "DeveloperListController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/developer/new", {
                templateUrl: "views/developer/developer-new.view.html",
                controller: "NewDeveloperController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/developer/:username/edit", {
                templateUrl: "views/developer/developer-edit.view.html",
                controller: "EditDeveloperController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })

            // application routes
            .when("/developer/:username/application", {
                templateUrl: "views/application/application-list.view.html",
                controller: "ApplicationListController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/developer/:username/application/new", {
                templateUrl: "views/application/application-new.view.html",
                controller: "NewApplicationController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/developer/:username/application/edit/:applicationId", {
                templateUrl: "views/application/application-edit.view.html",
                controller: "EditApplicationController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })

            // page routes
            .when("/developer/:username/application/:applicationId/page", {
                templateUrl: "views/page/page-list.view.html",
                controller: "PageListController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/developer/:username/application/:applicationId/new", {
                templateUrl: "views/page/page-new.view.html",
                controller: "NewPageController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/developer/:username/application/:applicationId/page/:pageId/edit", {
                templateUrl: "views/page/page-edit.view.html",
                controller: "EditPageController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            
            // widget routes
            .when("/developer/:username/application/:applicationId/page/:pageId/widget", {
                templateUrl: "views/widget/widget-list.view.html",
                controller: "WidgetListController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/developer/:username/application/:applicationId/page/:pageId/choose-widget", {
                templateUrl: "views/widget/widget-choose.view.html",
                controller: "ChooseWidgetController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .otherwise({
                redirectTo: "/"
            });

        var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
            var deferred = $.defer();

            $http.get("/api/loggedin").success(function (user) {
                $rootScope.errorMessage = null;

                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    $rootScope.error = 'You need to log in.';
                    deferred.reject();
                    $location.url('/');
                }
            });

            return deferred.promise;
        };
    }
})();
