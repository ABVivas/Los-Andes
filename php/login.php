<?php
session_start();

// Conexión con Oracle
$conn = oci_connect('LosAndes', 'losandes', '//localhost:1521/xe');
if (!$conn) {
    $e = oci_error();
    die("Error al conectar con Oracle: " . $e['message']);
}

// Recibir datos del formulario
$username = $_POST['username'];
$password = $_POST['password'];

// Preparar la consulta para buscar el usuario en la base de datos
$sql = "SELECT ID_USUARIO, NOMBRE, PASSWORD FROM USUARIOS WHERE NOMBRE = :username";
$stmt = oci_parse($conn, $sql);

// Asociar parámetros para evitar inyección SQL
oci_bind_by_name($stmt, ':username', $username);

// Ejecutar la consulta
oci_execute($stmt);

// Verificar si el usuario existe
if ($row = oci_fetch_assoc($stmt)) {
    $hashed_password = $row['PASSWORD'];

    // Verificar la contraseña hasheada
    if (password_verify($password, $hashed_password)) {
        // Iniciar sesión
        $_SESSION['user_id'] = $row['ID_USUARIO'];
        $_SESSION['username'] = $row['NOMBRE'];

        // Redirigir a la página de bienvenida
        header("Location: bienvenida.php");
        exit();
    } else {
        echo "Contraseña incorrecta.";
    }
} else {
    echo "Usuario no encontrado.";
}

// Cerrar conexión
oci_free_statement($stmt);
oci_close($conn);
?>
