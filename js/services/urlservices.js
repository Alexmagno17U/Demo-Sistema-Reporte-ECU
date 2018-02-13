
angular.module("KontrolaApp-Reporte ECU")
    //API SERVICES
    .factory("ResourceUrlLogin", function($resource) {
        return $resource("https://flota.kontrolagps.com/api/login/:id");
    })
    .factory("ResourceUrlLogout", function($resource) {
        return $resource("https://flota.kontrolagps.com/api/logout/:id");
    })
    //DIFERENT
    .factory("ResourceVehicles", function($resource) {
        var Resource = {};
        Resource.vehiclesAdministrator = function(token) {
            return $resource("https://flota.kontrolagps.com/api/vehicles/:id", {}, {
                query   : {
                       headers : {"Authenticate" : token },
                       method  : "GET"
                    }
            });
        };
        return Resource;
    })
    .factory("ResourceFuelLevel", function($resource) {
        var Resource = {};
        Resource.resourceFuelLevel = function(token, vid, duration) {//ademas el vehicleid
            return $resource("https://flota.kontrolagps.com/api/rawdata?vehicles=" + vid + "&duration=" + duration + "&fields=latitude:@lat,longitude:@lon,ecu_fuel_level,io_ign,&tz=America/Managua/:id", {}, {
                query   : {
                       headers : {"Authenticate" : token },
                       method  : "GET"
                    }
            });
        };
        return Resource;
    })
    

//ACORDATE Q CONTENT TYPE ES PARA CUANDO MANDO CUERPO,,,Y CUIANDO ES DE APLICATION JSON ES PARA UN STRING CON FORMATO JSON
//Y CUANDO ES application/x-www-form-urlencoded ES PARA UN QUERYSTRING,,o mejor dicho un formulario q se manda como querystring
//ya q asi es q se manda em formulario

//si mandas json puro, al final se manda un string y se manda el json en si, sin referencia,, es decir {valor1: 0, valor2: 3}
////y ya no variales = {valor1: 0, ...}....para eso seria en un solo script servidor en php,es decir un screip servidor por cada peticion
//,,,,y entonces por el contrario con query string s epuede en un mismo
//script servidor php para muchas solicitudes

//entonces arriba con ngresource, eta por omision json y solo se envia el json en si,,q por dentro sabemos se conviete a string

    //LOCAL SERVICES
    .factory("ResourceMeasurePHP", function($http) {
        var Resource = {};
        Resource.getAllMeasures = function() {
            return $http({
                method  :   "post",
                url     :   "./servidor/Service_VehicleLoad.php",
                //se pone solo un putno porque tabto la vista como el controller se cargan en el index
                headers: {  'Content-Type': 'application/x-www-form-urlencoded' },//content type por omision es: aplication/json
                data    :   "getmeasures" //entonces lo pongo asi para querystring..y este es solo referencia
            });
        };
        return Resource;
    })
    .factory("ResourceVehiclesLoaded", function($http) {//la administracion la dejo separado y no en un solo objeto como ngresource
        var Resource = {};
        Resource.getAll = function() {
            return $http({
                method  :   "get",
                url     :   "./servidor/Service_VehicleLoad.php?getvehicles"
                //se pone solo un punto porque tanto la vista como el controller se cargan en el index
                //IMPORTANTISIMO...SI FUERA POR POST
                //al enviar con post, obviamete enviamos un body y hay q especificar el content type,,, el content type por omision 
                //es aplication/json,,,,entonces lo pongo asi para qyerustring:
                //headers: {  'Content-Type': 'application/x-www-form-urlencoded' },
                //data    :   "vehicleId=" + vehicleId // este es el body obviamente
            });
        };
        Resource.getOneVehicle = function(vehicleId) {
            return $http({
                method  :   "get",
                url     :   "./servidor/Service_VehicleLoad.php?vehicleId=" + vehicleId
                //se pone solo un punto porque tanto la vista como el controller se cargan en el index
                //IMPORTANTISIMO...SI FUERA POR POST
                //al enviar con post, obviamete enviamos un body y hay q especificar el content type,,, el content type por omision 
                //es aplication/json,,,,entonces lo pongo asi para qyerustring:
                //headers: {  'Content-Type': 'application/x-www-form-urlencoded' },
                //data    :   "vehicleId=" + vehicleId // este es el body obviamente
            });
        };
        Resource.saveOneVehicle = function(obJson) {
            return $http({
                method  :   "post",
                url     :   "./servidor/Service_VehicleLoad.php",
                //se pone solo un putno porque tabto la vista como el controller se cargan en el index
                //IMPORTANTISIMO
                //al enviarcon post, obviamete enviamos un body y hay q especificar el content type, el content type por omision 
                //es aplication/json,,,,entonces lo pongo asi para qyerustring:
                headers: {  'Content-Type': 'application/x-www-form-urlencoded' },//enviar un querystring, pero como valor es un json
                data    :   "newVehicle=" + obJson //entonces esta bien leer su valor en php por eso en js puro se pone solo esto
            });//si queremos aplication/json tendria q recibirla un solo script de php para enviar el json en si: {valor1: i, valor2: 3}
        };
        Resource.updateOneVehicle = function(obJson) {
            return $http({
                method  :   "post",
                url     :   "./servidor/Service_VehicleLoad.php",
                headers : {  'Content-Type': 'application/x-www-form-urlencoded' },//enviar un querystring, pero como valor es un json
                data    :   "editVehicle=" + obJson //entonces esta bien leer su valor en php por eso en js puro se pone solo esto
            });
        };
        return Resource;
    })
    



    //PRUEBA CON JSON
    .factory("ResourceJSONAlert", function($http) {
        var Resource = {};
        Resource.getAll = function() {
            return $http({
                method  :   "post",
                url     :   "./servidor/readJSON.php", 
                headers :   { 'Content-Type': 'application/x-www-form-urlencoded' },
                data    :   "getAll"
            });
        };
        Resource.getOne =  function(id) {
            return $http({
                method  :   "post",
                url     :   "./servidor/readJSON.php", 
                headers :   { 'Content-Type': 'application/x-www-form-urlencoded' },
                data    :   "id=" + id
            });
        };
        return Resource;
    });