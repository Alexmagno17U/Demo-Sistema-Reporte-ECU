

var valuesVehicle = {};
//obtener los valores d ela url
function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
var position = getUrlVars();
console.log(position);
function initMap() {
    var mapOptions = {
         zoom    :   8,
         center  :   new google.maps.LatLng(position.lat, position.lng)
    };
    var map = new google.maps.Map(document.getElementById("container-map"), mapOptions);
    var contentString = '<div id="content">'+
        'Vehiculo: ' + decodeURI(position.name) + '<br/> Hora: ' + position.date + 
        '</div>';
    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });
    var posit = new google.maps.LatLng({ lat : parseFloat(position.lat), lng : parseFloat(position.lng) });
    infoWindow.setPosition(posit);
    infoWindow.open(map); 
    
}

window.addEventListener("load", function() {
    initMap();
});
