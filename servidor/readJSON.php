<?php

$data = [
    ["alertId" => 1, "vehicle" => "Mitsubishi", "message" => "Se ha hecho una sustracion", "miliV" => "2 galones", 
    "date" => "2018-02-12T09:30:00", "latitude" => 12.5648, "longitude" => -86.2547 ],
    ["alertId" => 2, "vehicle" => "Rav 4", "message" => "Se ha hecho una sustracion", "miliV" => "2 galones", 
    "date" => "2018-01-10T10:30:00", "latitude" => 12.1648, "longitude" => -86.2547]
];

if(isset($_POST["getAll"])) {
    echo json_encode($data);  
}

if(isset($_POST["id"])) {
   echo getOne($data, $_POST["id"]); 
}

function getOne($g, $id) {
    for($i=0; $i<count($g); $i++) {
        if($g[$i]["alertId"]==$id) {
            return json_encode($g[$i]);
        }
        
    }
}

 