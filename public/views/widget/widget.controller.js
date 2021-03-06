(function () {
    angular
        .module("WebAppMakerApp")
        .controller("WidgetListController", widgetListController)
        .controller("ChooseWidgetController", chooseWidgetController)
        .controller("WidgetEditController", widgetEditController);
    
    function widgetEditController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.username = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;

        vm.updateWidget = updateWidget;
        vm.removeWidget = removeWidget;

        function init() {
            WidgetService
                .findWidgetById(vm.applicationId, vm.pageId, vm.widgetId)
                .then(
                    function (response) {
                        vm.widget = response.data;
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }
        init();

        function removeWidget(widget) {
            WidgetService
                .removeWidget(vm.applicationId, vm.pageId, vm.widgetId)
                .then(
                    function (response) {
                        $location.url("/developer/" + vm.username + "/application/" + vm.applicationId + "/page/" + vm.pageId + "/widget");
                    },
                    function (error) {
                        vm.error = error;
                    }
                );
        }

        function updateWidget(widget) {
            WidgetService
                .updateWidget(vm.applicationId, vm.pageId, vm.widgetId, widget)
                .then(
                    function (response) {
                        $location.url("/developer/" + vm.username + "/application/" + vm.applicationId + "/page/" + vm.pageId + "/widget");
                    },
                    function (error) {
                        vm.error = error;
                    }
                )
        }
    }

    function widgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.username = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;
        vm.pageId = $routeParams.pageId;

        vm.safeYouTubeUrl = safeYouTubeUrl;
        vm.getButtonClass = getButtonClass;

        function init() {
            WidgetService
                .getWidgets(vm.applicationId, vm.pageId)
                .then(
                    function (response) {
                        vm.widgets = response.data;
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }
        init();

        function getButtonClass(style) {
            if (!style) {
                style = "default";
            }
            return "btn-" + style.toLowerCase();
        }

        function safeYouTubeUrl(widget) {
            if (widget) {
                var urlParts = widget.youTube.url.split("/");
                var youTubeId = urlParts[urlParts.length - 1];
                return $sce.trustasResourceUrl("https://www.youtube.com/embed/" + youTubeId);
            }
            return "";
        }
    }

    function chooseWidgetController($routeParams, WidgetService, $location) {
        var vm = this;

        vm.username = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;
        vm.pageId = $routeParams.pageId;

        vm.selectWidget = selectWidget;

        function selectWidget(widgetType) {
            WidgetService
                .addWidget(vm.applicationId, vm.pageId, widgetType)
                .then(
                    function (response) {
                        $location.url("/developer/" + vm.username + "/application/"
                            + vm.applicationId + "/page/" + vm.pageId + "/widget");
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }
    }
})();
