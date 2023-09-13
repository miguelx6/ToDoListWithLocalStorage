<?php
// Inicia la sesión
session_start();

if (isset($_POST['dato'])) {
    // Obtiene el dato enviado desde la aplicación JavaScript
    $dato = $_POST['dato'];

    // Almacena el dato en la sesión
    $_SESSION['myData'] = $dato;

    // Responde con un mensaje de éxito (esto se enviará de vuelta a la aplicación JavaScript)
    echo "Datos guardados en la sesión con éxito.";
} else {
    // Si no se proporciona un dato, responde con un mensaje de error
    echo "Error: No se proporcionó ningún dato.";
}
?>
