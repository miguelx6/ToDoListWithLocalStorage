<?php
$iniciar = session_start();

if (isset($_POST['dato'])) {
    $dato = $_POST['dato'];

    // Almacena el dato en la sesión del servidor
    $_SESSION['miDato'] = 'Nuevo Valor';

    header("location: index.html");
    exit;
    
return true;

}else {
    return false;
}

//Al final de la sesion, puedes destruir la sesion 
session_destroy();
?>

