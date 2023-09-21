<?php
// Inicia la sesión
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['dato'])) {
    // Obtiene el dato enviado desde el formulario
    $dato = $_POST['dato'];

    // Validación y limpieza (ajusta según tus necesidades)
    $dato = htmlspecialchars($dato);

    // Almacena el dato en la sesión del servidor
    $_SESSION['miDato'] = $dato;

    // Redirige al usuario de vuelta a session_handler.php
    header("Location: session_handler.php");
    exit;
} else {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Solicitud incorrecta"]);
    exit;
}
?>

