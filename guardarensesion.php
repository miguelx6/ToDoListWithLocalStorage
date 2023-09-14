<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Endpoint para obtener todas las tareas almacenadas.
    $tasks = []; // Recupera las tareas de la base de datos o de donde las almacenes.
    echo json_encode($tasks);
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Endpoint para agregar una nueva tarea.
    $data = json_decode(file_get_contents("php://input"), true);
    
    // Validar y guardar la tarea en la base de datos o en donde prefieras.
    
    echo json_encode(["message" => "Tarea agregada correctamente"]);
} else {
    http_response_code(405); // Método no permitido
    echo json_encode(["message" => "Método no permitido"]);
}

session_set_save_handler($header, true);
?>
