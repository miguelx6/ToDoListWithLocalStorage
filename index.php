<?php
// Inicia la sesión
session_start();

// Verifica si el usuario ya ha iniciado sesión
if (isset($_SESSION['user'])) {
    // Si el usuario ya está autenticado, redirige a la página de tareas
    header('Location: tareas.php');
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
            header('Location: tareas.php');
            exit;
        }
    }
    fclose($file);

    // Las credenciales son incorrectas, muestra un mensaje de error
    $error = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión</title>
</head>
<body>
    <h1>Iniciar Sesión</h1>

    <?php if (isset($error)) { ?>
        <p style="color: red;"><?php echo $error; ?></p>
    <?php } ?>

    <form action="login.php" method="post">
        <label for="username">Nombre de usuario:</label>
        <input type="text" id="username" name="username" required><br><br>

        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required><br><br>

        <button type="submit">Iniciar Sesión</button>
    </form>
</body>
</html>
