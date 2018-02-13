<?php


class CMeasure {
    private $measureId;
    private $description;
    
    function getMeasureId() { return $this->measureId; }
    function setMeasureId($measureId) { $this->measureId = $measureId; }
    function getDescription() { return $this->description; }
    function setDescription($description) { $this->description = $description; }

 
    
    //para cargar las medidas
    function getMeasures() {
        $sentencia = "select * from Measure";
        $conexion = new CConexionPoo();
        $con = $conexion->Conectar();
        $medidas = [];
        try {
            $resultado = $con->query($sentencia);
            while($obj = $resultado->fetch_object()) {
                $medidas[] = $obj;
            }
        } catch(Exception $e) { }
        $con->close();
        return $medidas;
    }
}