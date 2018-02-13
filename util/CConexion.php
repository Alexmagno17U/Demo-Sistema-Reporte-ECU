<?php

class CConexionPoo {
    
    public function Conectar() {
        $conexion = null;
        try{
            $conexion = new mysqli("localhost", "root", "magno", "SISKontrolaGPS");
        } catch(Exception $e) {
            $e->getMessage();
        }
        return $conexion;
    }
}