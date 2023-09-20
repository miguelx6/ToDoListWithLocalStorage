<?php
// Inicia la sesión
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['task'])) {
    // Obtiene el dato enviado desde el formulario
    $dato = $_POST['task'];

    // Validación y limpieza (ajusta según tus necesidades)
    $dato = htmlspecialchars($task);

    // Almacena el dato en la sesión del servidor
    $_SESSION['miDato'] = $task;

    // Redirige al usuario de vuelta a index.html (asegúrate de que index.html sea válido)
    header("Location: index.html");
    exit;
} else {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Solicitud incorrecta"]);
    exit;
}
?>

