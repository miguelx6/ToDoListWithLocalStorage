<?php
session_start();

// Obtén las tareas almacenadas en localStorage
$localStorageTasks = json_decode($_POST['localStorageTasks'], true);

// Almacena las tareas en sessionStorage
$_SESSION['sessionStorageTasks'] = $localStorageTasks;

// Envía una respuesta JSON
$response = [
    'message' => 'Tareas transferidas de localStorage a sessionStorage',
];
echo json_encode($response);

// Redirige a la página principal
header('Location: index.html');
?>


