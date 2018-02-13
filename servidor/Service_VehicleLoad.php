<?php

require_once '../util/CConexion.php';
require_once '../class/CVehicle.php';
require_once '../class/CMeasure.php';;

//medidas
//cargar el combo de medidas
if(isset($_POST["getmeasures"])) {
    $measure = new CMeasure();
    $measures = $measure->getMeasures();
    echo json_encode($measures);
}
if(isset($_GET["measureId"])) {
    $measure = new CMeasure();
    $description = $measure->getDescriptionByMeasureId($_GET["measureId"]);
    echo $description;
} 

//vehiculos 
if(isset($_GET["getvehicles"])) {
    $vehicle = new CVehicle();
    $vehicles = $vehicle->seleccionarTodos();
    echo json_encode($vehicles);
}
//seleccionar un vehiculo   
if(isset($_GET["vehicleId"])) {
    $vehicle = new CVehicle();
    $veh = $vehicle->seleccionarUno($_GET["vehicleId"]);
    echo json_encode($veh);
}
//insertar un vehiculo
if(isset($_POST["newVehicle"])) {
    $objVehicle = json_decode($_POST["newVehicle"]);//sino pongo true, convierte a objeto php
    $vehicle = new CVehicle();
    $vehicle->setVehicleId($objVehicle->vehicleId);
    $vehicle->setCapacity($objVehicle->capacity);
    //$vehicle->setMiliV($objVehicle->miliV);
    $vehicle->setMeasureId($objVehicle->measureId);
    $res = $vehicle->insertar();
    if($res) {
        echo "saved";
    }
}
if(isset($_POST["editVehicle"])) {
    $objVehicle = json_decode($_POST["editVehicle"]);
    $vehicle = new CVehicle();
    $vehicle->setVehicleId($objVehicle->vehicleId);
    $vehicle->setCapacity($objVehicle->capacity);
    //$vehicle->setMiliV($objVehicle->miliV);
    $vehicle->setMeasureId($objVehicle->measureId);
    $res = $vehicle->actualizar();
    if($res) {
        echo "edited";
    }
}
