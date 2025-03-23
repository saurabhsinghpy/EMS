<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));
$id = $data->id;
$name = $data->name;
$department_id = $data->department_id;
$position_id = $data->position_id;

$sql = "UPDATE employees SET name='$name', department_id='$department_id', position_id='$position_id' WHERE id=$id";
echo ($conn->query($sql) ? json_encode(["success" => true]) : json_encode(["error" => $conn->error]));
?>
