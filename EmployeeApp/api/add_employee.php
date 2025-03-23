<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));
$name = $data->name;
$department_id = $data->department_id;
$position_id = $data->position_id;

$sql = "INSERT INTO employees (name, department_id, position_id) VALUES ('$name', '$department_id', '$position_id')";
echo ($conn->query($sql) ? json_encode(["success" => true]) : json_encode(["error" => $conn->error]));
?>
