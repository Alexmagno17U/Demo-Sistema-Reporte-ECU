
function showHideMenuBar(band) {
    if(band === true) {
        document.getElementById("barramenujs").style.display = "block";
    } else {
        document.getElementById("barramenujs").style.display = "none";
    }  
}

//token
function guardarCookieToken(auth) {
    document.cookie = "auth=" + auth;
}
function getCookieToken() {
    var to = document.cookie.split("=");
    return to[1];
}


//get ids checked true ...para array simple se numeros
var arrayVehicleIds = [];
//function getIds(checkbox) {
//   var id;
//   if(checkbox.checked===true) {
//      id = checkbox.parentNode.parentNode.parentNode.parentNode.cells[0].children[0].value;
//      if(arrayVehicleIds.includes(id)) { return; }
//      else { arrayVehicleIds.push(id); }
//      
//   }
//   else if(checkbox.checked === false) {
//      id = checkbox.parentNode.parentNode.parentNode.parentNode.cells[0].children[0].value;
//      if(arrayVehicleIds.includes(id)) { arrayVehicleIds.splice(arrayVehicleIds.indexOf(id), 1); }
//   }
//   
//    return arrayVehicleIds.sort(function (a, b){
//        return a - b;
//    });
//}

//para arreglo de json, mas mostro
var globalArrayVehicles = [];
function getVehicle(checkbox) {
    var vehicle = {};
    var id = checkbox.parentNode.parentNode.parentNode.parentNode.cells[0].children[0].value;
    if(checkbox.checked===true) {
        if(globalArrayVehicles.length===0) {
            vehicle.id = id;
            vehicle.name = checkbox.parentNode.parentNode.parentNode.parentNode.cells[1].innerHTML;
            globalArrayVehicles.push(vehicle);
        } else {
            if(include(globalArrayVehicles, id)) {
                return;
            } else {
                vehicle.id = id;
                vehicle.name = checkbox.parentNode.parentNode.parentNode.parentNode.cells[1].innerHTML;
                globalArrayVehicles.push(vehicle);
            }
        }
    } else {
        if(include(globalArrayVehicles, id)) {
                remove(globalArrayVehicles, id);
            }
    }
    ordenarAsc(globalArrayVehicles, "id");
    console.log(globalArrayVehicles);
}
function include(array, value) {
    var flag = false;
    for(var i=0; i<array.length; i++) {
        if(array[i].id===value) {
            flag = true;
        }
    }
    return flag;
}
function remove(array, id) {
    for(var i=0; i<array.length; i++) {
        if(array[i].id===id) {
            array.splice(i,1);
        }
    }
}
//ordenar por id
function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      return a[p_key] > b[p_key];
   });
}



