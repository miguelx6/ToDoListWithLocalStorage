<?php
require_once 'guardarensesion.php';

// Inicia la sesión
$handler = new Mysessionhandler();
session_set_save_handler($handler, true);
session_start();

if (isset($_POST['dato'])) {
    // Obtiene el dato enviado desde el formulario
    $dato = $_POST['dato'];

    // Validación y limpieza (ajusta según tus necesidades)
    $dato = htmlspecialchars($dato);

    // Almacena el dato en la sesión del servidor
    $_SESSION['miDato'] = $dato;
    
    // Redirige al usuario de vuelta a index.html (asegúrate de que index.html sea válido)
    header("Location: index.html");
    exit; 
}

session_destroy();
?>




