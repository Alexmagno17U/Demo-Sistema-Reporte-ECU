
angular.module("KontrolaApp-Reporte ECU", ["ngRoute", "ngMaterial", "ngResource", "ui.bootstrap", "angularjs-datetime-picker"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                controller      :   "controladorlogin",
                templateUrl     :   "./views/login.html"
            })
            .when("/adminalerts", {
                controller      :   "controladoradminalerts",
                templateUrl     :   "./views/admialerts/view.html"
            })
            .when("/adminalerts/load/:id", {
                controller      :   "controladoradminalerts",
                templateUrl     :   "./views/admialerts/report.html"
            })
            .when("/adminvehiclefuellevel", {
                controller      :   "controladoradminvehiclesfuellevel",
                templateUrl     :   "./views/adminvehicle/view.html"
            })
            .when("/adminvehiclefuellevel/load/:id", {
                controller      :   "controladoradminvehiclesfuellevel",
                templateUrl     :   "./views/adminvehicle/form.html"
            })
            .when("/viewreport", {
                controller      :   "controladoradminreporteecu",
                templateUrl     :   "./views/reportECU/viewreportECU.html"
            })
            .when("/reportECU", {
                controller      :   "controladorreporteecu", 
                templateUrl     :   "./views/reportECU/reportECU.html"
            });

    }).filter("startFrom", function() {
        return function(data, start) {
           return data.slice(start); 
        };
    });