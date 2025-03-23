<?php
require_once "db.php"; // Database connection

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->password)) {
    $username = $data->username;
    $password = $data->password;

    $stmt = $conn->prepare("SELECT id, username, password, role FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        if (hash('sha256', $password) === $row['password']) {  // Check hashed password
            echo json_encode(["success" => true, "user" => ["id" => $row["id"], "username" => $row["username"], "role" => $row["role"]]]);
            exit;
        }
    }
}

echo json_encode(["success" => false]);
?>
