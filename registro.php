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
$password_confirm = $_POST['password_confirm'];

// Verificar que las contraseñas coincidan
if ($password !== $password_confirm) {
    die("Las contraseñas no coinciden.");
}

// Verificar que el usuario no exista en la base de datos
$sql = "SELECT NOMBRE FROM USUARIOS WHERE NOMBRE = :username";
$stmt = oci_parse($conn, $sql);
oci_bind_by_name($stmt, ':username', $username);
oci_execute($stmt);

// Si ya existe el usuario
if (oci_fetch_assoc($stmt)) {
    die("El nombre de usuario ya está registrado.");
}

// Hashear la contraseña antes de guardarla
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insertar el nuevo usuario en la base de datos
$sql_insert = "INSERT INTO USUARIOS (NOMBRE, PASSWORD) VALUES (:username, :password)";
$stmt_insert = oci_parse($conn, $sql_insert);
oci_bind_by_name($stmt_insert, ':username', $username);
oci_bind_by_name($stmt_insert, ':password', $hashed_password);

if (oci_execute($stmt_insert)) {
    echo "Cuenta creada exitosamente. Ahora puedes <a href='login.html'>iniciar sesión</a>.";
} else {
    echo "Error al registrar el usuario.";
}

// Liberar y cerrar la conexión
oci_free_statement($stmt);
oci_free_statement($stmt_insert);
oci_close($conn);
?>
