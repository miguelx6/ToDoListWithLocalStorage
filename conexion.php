<?php
// require_once 'Mysessionhandler.php';

// Inicia la sesión
$handler = new Mysessionhandler();
session_set_save_handler($handler, true);
session_start();

if (isset($_POST['dato'])) {
    // Obtiene el dato enviado desde el formulario
    $dato = $_POST['dato'];

    // Almacena el dato en la sesión del servidor
    $_SESSION['miDato'] = $dato;

    var_dump($_SESSION);

    // Redirige al usuario de vuelta a index.html
    header("Location: index.html");
    exit; 
}
?>



