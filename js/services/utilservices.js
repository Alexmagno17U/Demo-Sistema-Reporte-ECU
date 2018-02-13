angular.module("KontrolaApp-Reporte ECU")          
    .factory("ResourceDialogs", function($mdDialog) {
        var Dialogs = {};
        Dialogs.alertloginDialog = function(ev) {
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#reference-dialogs')))
                .clickOutsideToClose(true)
                .title('Alerta')
                .textContent('Credenciales Invalidas!')
                .ariaLabel('Alert Dialog Demo')
                .ok('Aceptar!')
                .targetEvent(ev)
            );
        };
        Dialogs.alertErrorInforDialog = function(ev) {
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#reference-dialogs')))
                .clickOutsideToClose(true)
                .title('Alerta')
                .textContent('Error de informacion')
                .ariaLabel('Alert Dialog Demo')
                .ok('Aceptar!')
                .targetEvent(ev)
            );
        };
        Dialogs.alertErrorInforDialog = function(ev) {
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#reference-dialogs')))
                .clickOutsideToClose(true)
                .title('Alerta')
                .textContent('Error de informacion')
                .ariaLabel('Alert Dialog Demo')
                .ok('Aceptar!')
                .targetEvent(ev)
            );
        };
        Dialogs.alertEmptyArray = function(ev) {
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#reference-dialogs')))
                .clickOutsideToClose(true)
                .title('Alerta')
                .textContent('Debe seleccionar un vehiculo!')
                .ariaLabel('Alert Dialog Demo')
                .ok('Aceptar!')
                .targetEvent(ev)
            );
        };
        return Dialogs;
    })
    .factory("ResourceMedidorFuelLevel", function() {
        var Medidor = {};
        Medidor.drawReportNow = function(vehicle,lastValue) {
            console.log(vehicle);
            var measure = "";
            if(vehicle.measureId==="1") measure = "Litros";
            else if(vehicle.measureId==="2") measure = "Galones";
            var range1 = Math.trunc(vehicle.capacity/3);
            var range2 = range1 * 2;
            var range3 = range1 * 3;
            var chart = AmCharts.makeChart("container-medidorfuelleveljs", {
                "type": "gauge",
                "theme": "light",
                "axes": [ {
                  "axisThickness": 1,
                  "axisAlpha": 0.2,
                  "tickAlpha": 0.2,
                  "valueInterval": 5,
                  "bands": [ {
                    "color": "#cc4748",
                    "endValue": range1,
                    "startValue": 0
                  }, {
                    "color": "#fdd400",
                    "endValue": range2,
                    "startValue": range1
                  }, {
                    "color": "#84b761",
                    "endValue": range3,
                    "innerRadius": "95%",
                    "startValue": range2
                  } ],
                  "bottomText": "0 ",
                  "bottomTextYOffset": -20,
                  "endValue": vehicle.capacity
                } ],
                "arrows": [ {} ],
                "export": {
                  "enabled": true
                }
              });
              
            //var value = Math.round(((1 - (lastValue.ecu_fuel_level * vehicle.capacity))/vehicle.miliV)   * 100) / 100; //suponiendo q era proporcional pero no
            var value =  Math.round(  ((1 - (lastValue.ecu_fuel_level/vehicle.miliV))*vehicle.capacity)    * 100) / 100;
            //var value =  Math.round( ((1 - (vehicle.miliV/lastValue.ecu_fuel_level)) *  vehicle.capacity)      * 100) / 100;
            console.log(lastValue.ecu_fuel_level);
            console.log(vehicle.miliV);
            console.log(vehicle.capacity);
            setTimeout(function() {
                if ( chart ) {
                    if ( chart.arrows ) {
                        if ( chart.arrows[ 0 ] ) {
                            if ( chart.arrows[ 0 ].setValue ) {
                                chart.arrows[ 0 ].setValue( value );
                                chart.axes[ 0 ].setBottomText( value + "   " +  measure + " \n" + "ultima lectura: " + lastValue.event_time);
                            }
                        }
                    }
                }
            }, "500");
           return chart;
        };
        Medidor.drawFuelLevelAfter = function() {
            var measure = "Galones";
            var range1 = 20/3;
            var range2 = range1 * 2;
            var range3 = range1 * 3;
            var chart = AmCharts.makeChart("container-medidorfuelleveljs1", {
                "type": "gauge",
                "theme": "light",
                "axes": [ {
                  "axisThickness": 1,
                  "axisAlpha": 0.2,
                  "tickAlpha": 0.2,
                  "valueInterval": 5,
                  "bands": [ {
                    "color": "#ccc",
                    "endValue": range1,
                    "startValue": 0
                  }, {
                    "color": "#ccc",
                    "endValue": range2,
                    "startValue": range1
                  }, {
                    "color": "#ccc",
                    "endValue": range3,
                    "innerRadius": "95%",
                    "startValue": range2
                  } ],
                  "bottomText": "0 ",
                  "bottomTextYOffset": -20,
                  "endValue": 20
                } ],
                "arrows": [ {} ],
                "export": {
                  "enabled": true
                }
              });
            //var value =  Math.round( ((1 - (vehicle.miliV/lastValue.ecu_fuel_level)) *  vehicle.capacity)      * 100) / 100;
            var value = 10.5;
            setTimeout(function() {
                if ( chart ) {
                    if ( chart.arrows ) {
                        if ( chart.arrows[ 0 ] ) {
                            if ( chart.arrows[ 0 ].setValue ) {
                                chart.arrows[ 0 ].setValue( value );
                                chart.axes[ 0 ].setBottomText( value + "   " +  measure);
                            }
                        }
                    }
                }
            }, "500");
           return chart;
        };
        Medidor.drawFuelLevelNow = function() {
            var measure = "Galones";
            var range1 = 20/3;
            var range2 = range1 * 2;
            var range3 = range1 * 3;
            
            var value  = 8.5;
            var value2 = 10.6;
             
             
            var chart = AmCharts.makeChart("container-medidorfuelleveljs2", {
                "type": "gauge",
                "theme": "light",
                "axes": [ {
                  "axisThickness": 1,
                  "axisAlpha": 0.2,
                  "tickAlpha": 0.2,
                  "valueInterval": 5,
                  "bands": [ {
                    "color": "#ccc",
                    "endValue": value,
                    "startValue": 0
                  }, {
                    "color": "#b21f2d",
                    "endValue": value2,
                    "startValue":  value
                  }, {
                    "color": "#ccc",
                    "endValue": 20,
                    "innerRadius": "95%",
                    "startValue": value2
                  } ],
                  "bottomText": "0 ",
                  "bottomTextYOffset": -20,
                  "endValue": 20
                } ],
                "arrows": [ {} ],
                "export": {
                  "enabled": true
                }
              });
            //var value =  Math.round( ((1 - (vehicle.miliV/lastValue.ecu_fuel_level)) *  vehicle.capacity)      * 100) / 100;
           
            setTimeout(function() {
                if ( chart ) {
                    if ( chart.arrows ) {
                        if ( chart.arrows[ 0 ] ) {
                            if ( chart.arrows[ 0 ].setValue ) {
                                chart.arrows[ 0 ].setValue( value );
                                chart.axes[ 0 ].setBottomText( value + "   " +  measure);
                            }
                        }
                    }
                }
            }, "500");
           return chart;
        };
        return Medidor;
       
    });