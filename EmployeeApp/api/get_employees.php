<?php
include 'db.php';

$sql = "SELECT employees.id, employees.name, departments.department_name, positions.position_name 
        FROM employees 
        JOIN departments ON employees.department_id = departments.id 
        JOIN positions ON employees.position_id = positions.id";

$result = $conn->query($sql);
$employees = [];

while ($row = $result->fetch_assoc()) {
    $employees[] = $row;
}
echo json_encode($employees);
?>
