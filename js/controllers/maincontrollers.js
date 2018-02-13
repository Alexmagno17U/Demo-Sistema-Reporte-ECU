
angular.module("KontrolaApp-Reporte ECU")
    .controller("controladorlogin", function($scope, $location, ResourceUrlLogin, ResourceDialogs) {
        showHideMenuBar(false);
        $scope.user = {};
        //login
        $scope.login = function() {
            var promesa = ResourceUrlLogin.save($scope.user);
            promesa.$promise.then(function(data) {
                $location.path("/adminvehiclefuellevel");
                guardarCookieToken(data.auth);
            }, function(err) {
                console.log(err.data);
                ResourceDialogs.alertloginDialog();
            });
        };
   })
    .controller("controladorhome", function($scope, $mdSidenav, $location, ResourceUrlLogout) {
            $scope.toggleLeft = buildToggleLeft("left");
            function buildToggleLeft(type) {
                return function() {
                    $mdSidenav(type).toggle();
                };
            }
            //logout
            $scope.logout = function() {
                ResourceUrlLogout.get().$promise.then(function(data) {
                    console.log(data);
                    $location.path("/");
                });  
            };
        })
    .controller("controladoradminalerts", function($scope, $mdSidenav, ResourceJSONAlert, $routeParams, ResourceMedidorFuelLevel) {
        showHideMenuBar(true);
        $mdSidenav("left").close();
        
        $scope.id = $routeParams.id;
        if($scope.id !== undefined) {
            $scope.dataAlert = {};
            ResourceJSONAlert.getOne($scope.id).then(function(data) {
                var dataAlert = {};
                $scope.dataAlert.vehicle   = data.data.vehicle;
                $scope.dataAlert.message   = data.data.message;
                $scope.dataAlert.miliV     = data.data.miliV;
                $scope.dataAlert.date      = data.data.date;
                $scope.dataAlert.latitude  = data.data.latitude;
                ResourceMedidorFuelLevel.drawFuelLevelAfter();
                ResourceMedidorFuelLevel.drawFuelLevelNow();
                console.log($scope.dataAlert);
            }, function(err) {
                console.log(err);
            });
        } else {
            //paginacion
            $scope.pageSize = 5;
            $scope.currentPage = 1;
            $scope.alerts = [];
            ResourceJSONAlert.getAll().then(function(data) {
                var dataAlert = {};
                for(var i=0; i<data.data.length; i++) {
                    dataAlert.id        = data.data[i].alertId;
                    dataAlert.vehicle   = data.data[i].vehicle;
                    dataAlert.date      = data.data[i].date;
                    $scope.alerts.push(dataAlert);
                    dataAlert = {};
                } 
                console.log($scope.alerts);
            }, function(err) {
                console.log(err);
            });  
           
        }
        
        
    })
    .controller("controladoradminvehiclesfuellevel", function($scope, $mdSidenav, ResourceVehicles, ResourceFuelLevel, 
        $routeParams, ResourceVehiclesLoaded, ResourceMeasurePHP, ResourceDialogs,$location) {
        //EL MISMO CONTROLADOR PARA EL CRUD, SI HAY UN VALOR EN EL PARAM DE USA UNA PARTE DEL CODIGO PARA GUARDAR/ACTUALIZAR 
        //EN LA BD LOCAL, SINO SOLO MOSTRAR LOS VEHICULOS Y CARGAR CADA UNO EN LA BASE DE DATOS LOCAL
        showHideMenuBar(true);
        $mdSidenav("left").close();
        $scope.id = $routeParams.id;
        $scope.fuelHighestLevel = 0;
        if($scope.id !== undefined) {
            ResourceVehiclesLoaded.getOneVehicle($scope.id).then(function(data) {
                if(data.data==="null") {
                    $scope.saveData = function() {
                        //setHighestLevel();//cargar la variable: $scope.fuelHighestLevel
                        setTimeout(function() {//un segundo para q cargue
                            var newVehicle = {
                            vehicleId   : $scope.id,
                            capacity    : $scope.capacity,
                            //miliV       : $scope.fuelHighestLevel,
                            measureId   : $scope.selectedMeasureId
                            };
                            ResourceVehiclesLoaded.saveOneVehicle(JSON.stringify(newVehicle)).then(function(res) {
                                console.log(res);
                                if(res.data !== "saved") {
                                    ResourceDialogs.alertErrorInforDialog(); 
                                    $scope.selectedMeasureId    = undefined;
                                    $scope.capacity             = undefined;
                                    return;
                                } else {
                                    $location.path("/adminvehiclefuellevel");
                                }
                            }, function(err) {
                                console.log(err);
                            });
                        }, "1000");
                    }; 
                } else {//carga de campos
                    $scope.selectedMeasureId = data.data.measureId;
                    $scope.capacity          = data.data.capacity;
                    $scope.saveData = function() {
                        //setHighestLevel();//cargar la variable: $scope.fuelHighestLevel
                        setTimeout(function() {//un segundo para q cargue
                            var vehicleEdited = {
                                vehicleId   : $scope.id,
                                capacity    : $scope.capacity,
                                //miliV       : $scope.fuelHighestLevel,
                                measureId   : $scope.selectedMeasureId
                            };
                            ResourceVehiclesLoaded.updateOneVehicle(JSON.stringify(vehicleEdited)).then(function(res) {
                                console.log(res);
                                if(res.data !== "edited") {
                                        ResourceDialogs.alertErrorInforDialog();
                                        $scope.capacity             = data.data.capacity;
                                        return;
                                } else {
                                    $location.path("/adminvehiclefuellevel");
                                }
                            }, function(err) {
                                console.log(err);
                            });
                        }, "1000");
                    };
                }
            }, function(err) {
                console.log(err);
            });
            //cargar combo 
            $scope.measures = [];
            ResourceMeasurePHP.getAllMeasures().then(function(resp) { $scope.measures = resp.data; }, function(err) { console.log(err); });
            //obtener el valor mas alto de mV
//            function setHighestLevel() {
//                ResourceFuelLevel.resourceFuelLevel(getCookieToken(), "PT30M").query().$promise.then(function(data) {
//                    var arrayFuelLevel = [];
//                    for(var i=0; i<data.events.length; i++) {
//                        if(data.events[i].ecu_fuel_level !== null) {
//                            arrayFuelLevel[i] = data.events[i].ecu_fuel_level;
//                        }
//                    }
//                    $scope.fuelHighestLevel = Math.max.apply(null, arrayFuelLevel);
//                }, function(err) {
//                    console.log(err);
//                });
//            } 
        }
        else {
            /////////SINO SOLO MOSTRAR
            //utilidades
            //paginacion
            $scope.pageSize = 5;
            $scope.currentPage = 1;
            //arreglo
            $scope.arrayVehicles = [];
            ResourceVehicles.vehiclesAdministrator(getCookieToken()).query().$promise.then(function(data) {
                var dataVehicle = {};
                for(var i=0; i<data.data.length; i++) {
                    if(data.data[i].info.alias==="ecu_monitor") {
                        dataVehicle.id = data.data[i].id;
                        dataVehicle.name = data.data[i].name;
                        dataVehicle.state = false;
                        $scope.arrayVehicles.push(dataVehicle);
                        dataVehicle = {};
                    }
                }
            }, function(err) {
                $location.path("/");
                console.log(err);
            }); 
        }
            
    })
    .controller("controladoradminreporteecu", function($scope, $mdSidenav, ResourceVehicles, $location, ResourceDialogs) {
        /////////////ESTE FORM SOLO PARA SELECCIONAR LOS VEHICULOS A LOS QUE SE GENERARA EL REPORTE
        /////UTILIDADES
        showHideMenuBar(true);
        $mdSidenav("left").close();
        //paginacion
        $scope.pageSize = 5;
        $scope.currentPage = 1;
        //load vehicles
        $scope.showHideSelectVehicles = false;
        $scope.show = false;
        $scope.$watch('showHideSelectVehicles', function(newVal) {
            if(newVal === undefined) newVal = false;
             $scope.show = false;
        });
        $scope.showVehicles = function() {
            $scope.show = $scope.show ? false : true;
        };
        //CARGAR ARRAY DE VEHICULOS
        $scope.arrayVehicles = [];
        ResourceVehicles.vehiclesAdministrator(getCookieToken()).query().$promise.then(function(data) {
            var dataVehicle = {};
            for(var i=0; i<data.data.length; i++) {
                if(data.data[i].info.alias==="ecu_monitor") {
                    dataVehicle.id = data.data[i].id;
                    dataVehicle.name = data.data[i].name;
                    dataVehicle.state = false;
                    $scope.arrayVehicles.push(dataVehicle);
                    dataVehicle = {};
                }
            }
        }, function(err) {
            $location.path("/");
            console.log(err);
        });
        //verificar la llenada del array global DEE VEHICULOS QUE ETSA EN UTIL
        $scope.url = "#!/reportECU";
        $scope.loadReport = function() {
           if(globalArrayVehicles.length===0) {
                $scope.url = "#!/viewreport";
                ResourceDialogs.alertEmptyArray();
           } else {
               $scope.url = "#!/reportECU";
           }
        };     
    })
    .controller("controladorreporteecu", function($scope, ResourceFuelLevel, ResourceVehiclesLoaded, ResourceMedidorFuelLevel) {
        var lastCorrectValue = {};
        //para la tabla
        $scope.dataVehicle = {};
        ResourceVehiclesLoaded.getOneVehicle(globalArrayVehicles[0].id).then(function(data) {
            setLastValue(globalArrayVehicles[0].id);
            setTimeout(function() {
                console.log(lastCorrectValue);
                ResourceMedidorFuelLevel.drawReportNow(data.data, lastCorrectValue);
                    $scope.$apply(function() {
                        $scope.dataVehicle.name         = globalArrayVehicles[0].name;
                        $scope.dataVehicle.latitude     = lastCorrectValue.latitude;
                        $scope.dataVehicle.longitude    = lastCorrectValue.longitude;
                        $scope.dataVehicle.state        = lastCorrectValue.io_ign ? "Encendido" : "Apagado";
                        $scope.dataVehicle.dateTime     = lastCorrectValue.event_time;   
                        $scope.text = "Ir al Mapa";//ara q cargue luego este texto con las variables ya cambiadas
                    });
                globalArrayVehicles = [];
            }, "3000");
        }, function(err) {
            console.log(err);
        });
       //ENVIAR EL LA ULTIMA LECTURA 
       function setLastValue(vid) {
            var array = []; 
            ResourceFuelLevel.resourceFuelLevel(getCookieToken(), vid, "P1D").query().$promise.then(function(data) {
               for(var i=data.events.length - 1; i>=0; i--) {
                    if(data.events[i].ecu_fuel_level !== null) {
                        lastCorrectValue = data.events[i];
                        break;
                    }
                }
                    
                      
//                var j=0;
//                for(var i=data.events.length - 1; i>=0; i--) {
//                    if(data.events[i].ecu_fuel_level === null) {
//                        array = [];
//                    }
//                    else {
//                        if(array.length===0) {
//                            array[j] = data.events[i];
//                            j++;
//                        } else {
//                            array[j] = data.events[i];
//                            j++;
//                        }  
//                    }
//                    if(j===2) { break; }
//                    
//                 }
//                //console.log(data.events);
//                console.log(array);
//                console.log(array[1].event_time - array[0].event_time);
//                var date1 = array[0].event_time.split("T");
//                var date2 = array[1].event_time.split("T");
//                console.log(date1);
//                console.log(date2);
               
            }, function(err) {
                console.log(err);
            });
        }
    });
        