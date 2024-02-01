<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión</title>
    <style>
        body {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
        }

        form {
            text-align: center;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            max-width: 400px;
            width: 100%;
        }

        a {
            text-decoration: none;
        }
    </style>
</head>
<body>
    <form>
        <?php
        require_once('config.php');

        echo "<h2>SECCIÓN PÚBLICA</h2>";

        if ($saml->isAuthenticated()) {
            $atributos = $saml->getAttributes();
            echo "<p>Existe sesión a nombre de " . $atributos["uNombre"][0] . "</p>";
            echo "<a href='./privada/'>Ir a sección privada</a>";
        } else {
            echo "<p>No hay sesión iniciada</p>";
            echo "<a href='./privada/'>Iniciar sesión</a>";
        }
        ?>
    </form>
</body>
</html>
