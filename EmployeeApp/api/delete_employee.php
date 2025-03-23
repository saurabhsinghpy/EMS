<?php
include 'db.php';

$id = $_GET['id'];

$sql = "DELETE FROM employees WHERE id=$id";
echo ($conn->query($sql) ? json_encode(["success" => true]) : json_encode(["error" => $conn->error]));
?>
