<?php
// require_once 'Mysessionhandler.php';

// Inicia la sesión
$handler = new Mysessionhandler();
session_set_save_handler($handler, true);
session_start();

if (isset($_POST['task'])) {
    // Obtiene el dato enviado desde el formulario
    $dato = $_POST['task'];

    // Validación y limpieza (ajusta según tus necesidades)
    $dato = htmlspecialchars($task);

    // Almacena el dato en la sesión del servidor
    $_SESSION['miDato'] = $task;

    // Redirige al usuario de vuelta a index.html (asegúrate de que index.html sea válido)
    header("Location: index.html");
    exit; 
}
?>




