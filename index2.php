<?php
// Inicia la sesión
session_start();

// Verifica si el usuario ya ha iniciado sesión
if (isset($_SESSION['user'])) {
    // Si el usuario ya está autenticado, redirige a la página de tareas
    header('Location: menu.html');
    exit;
}

// Verifica si se enviaron datos de inicio de sesión
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Lee las credenciales del archivo de texto
    $file = fopen('users.txt', 'r');
    while (!feof($file)) {
        $line = trim(fgets($file));
        list($storedUsername, $storedPassword) = explode("\t", $line);

        if ($username === $storedUsername && $password === $storedPassword) {
            // Las credenciales son válidas, establece una sesión para el usuario
            $_SESSION['user'] = $username;
            fclose($file);
            header('Location: menu.html')
            exit;
        }
    }
    fclose($file);

    // Las credenciales son incorrectas, muestra un mensaje de error
    $error = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
}
?>

