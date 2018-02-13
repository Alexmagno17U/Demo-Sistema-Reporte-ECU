<?php


class CVehicle {
   private $vehicleId;
   private $capacity;
   private $miliV;
   private $measureId;
   
   function getVehicleId() { return $this->vehicleId; }
   function setVehicleId($vehicleId) { $this->vehicleId = $vehicleId; }
   function getCapacity() { return $this->capacity; }
   function setCapacity($capacity) { $this->capacity = $capacity; }
   function getMiliV() { return $this->miliV; }
   function setMiliV($miliV) { $this->miliV = $miliV; }
   function getMeasureId() { return $this->measureId; }
   function setMeasureId($measureId) { $this->measureId = $measureId; }

   function seleccionarTodos() {
       $sentencia  = "select * from VehiclesLoaded";
       $conexion = new CConexionPoo();
       $con = $conexion->Conectar();
       $vehicles = [];
       try {
           $resultado = $con->query($sentencia);
           while($obj = $resultado->fetch_object()) {
               $vehicles[] = $obj;
           }
       } catch(Exception $e) { }
       $con->close();
       return $vehicles;
   }
   
   function seleccionarUno($vehicleId) {
       $sentencia = "select * from VehiclesLoaded where vehicleId=" . $vehicleId;
       $conexion = new CConexionPoo();
       $con = $conexion->Conectar();
       $objVehicle = null;
       try {
           $resultado = $con->query($sentencia);
           $objVehicle = $resultado->fetch_object();
       } catch(Exception $e) { }
       $con->close();
       return $objVehicle;
   }
     
   function insertar() {
       $sentencia = "insert into VehiclesLoaded values(" . $this->vehicleId . " , " . $this->capacity .
       ", 5000, " . $this->measureId . ")";
       $conexion = new CConexionPoo();
       $con = $conexion->Conectar();
       $resultado = null;
       try {
           $resultado = $con->query($sentencia);
       } catch(Exception $e) { }
       $con->close();
       return $resultado;
   }
   function actualizar() {
       $sentencia = "update VehiclesLoaded set capacity=" . $this->capacity . ", miliV=5000" .
        ", measureId=" . $this->measureId . " where vehicleId=" . $this->vehicleId;
       $conexion = new CConexionPoo();
       $con = $conexion->Conectar();
       $resultado = null;
       try {
           $resultado = $con->query($sentencia);
       } catch(Exception $e) { }
       $con->close();
       return $resultado;
   }
   
   
   
  


}