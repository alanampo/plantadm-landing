<?php

if (!isset($_SERVER["ip_list"])){
    $_SERVER["ip_list"] = [];
}

$ip = getIP();

if (isset($ip)){
    if (!in_array($ip, $_SERVER["ip_list"])){
        $email = test_input($_POST["email"]);
        $nombre = test_input(ucwords($_POST["nombre"]));
        $asunto = test_input($_POST["asunto"]);
        $message = test_input($_POST["message"]);

        $to = "contacto@plantadm.com";
        $subject = "FORMULARIO CONTACTO de $nombre: $asunto";
        $headers = "From: $email";

        if(mail($to, $subject, $message, $headers)) {
            array_push($_SERVER["ip_list"], $ip);
            echo "success";
        } 
    }
    else{
        echo "Ya has enviado un formulario de contacto desde esta IP.";
    }
}

function test_input($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function getIP()
{
    foreach (array('HTTP_CLIENT_IP',
                   'HTTP_X_FORWARDED_FOR',
                   'HTTP_X_FORWARDED',
                   'HTTP_X_CLUSTER_CLIENT_IP',
                   'HTTP_FORWARDED_FOR',
                   'HTTP_FORWARDED',
                   'REMOTE_ADDR') as $key){
        if (array_key_exists($key, $_SERVER) === true){
            foreach (explode(',', $_SERVER[$key]) as $IPaddress){
                $IPaddress = trim($IPaddress); // Just to be safe

                if (filter_var($IPaddress,
                               FILTER_VALIDATE_IP,
                               FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)
                    !== false) {

                    return $IPaddress;
                }
            }
        }
    }
}

?>
