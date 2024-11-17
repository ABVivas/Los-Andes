<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.html"); // Redirige a login si no está autenticado
    exit();
}

echo "¡Bienvenido, " . $_SESSION['username'] . "!";
?>
