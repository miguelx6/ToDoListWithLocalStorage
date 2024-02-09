<?php
// Se asegura de que el usuario esté autenticado
require_once("login.php");

echo "Bienvenido "; // Saluda al usuario
echo "<br><br>Usted se encuentra en la sección privada de esta aplicación<br>";
// Agrega el enlace para ir a la sección pública con la redirección a index.html
echo "<a href='../index.html'>Ir a sección pública</a><br>";
echo "<a href='logout.php'>[Cerrar sesión]</a>";
?>