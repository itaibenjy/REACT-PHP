<?php
require_once "../config/database.php";

header("Content-Type: application/json");

// Receive JSON POST
$data = json_decode(file_get_contents("php://input"), true);
$username = trim($data["username"] ?? "");
$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";

// Basic validation
if (!$username || !$email || !$password) {
    http_response_code(400);
    echo json_encode(["error" => "All fields are required."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email format."]);
    exit;
}

try {
    $db = new Database();
    $conn = $db->getConnection();

    // Check if email/username exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = :email OR username = :username");
    $stmt->execute([':email' => $email, ':username' => $username]);

    if ($stmt->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(["error" => "Username or email already exists."]);
        exit;
    }

    // Insert new user
    $hashed = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
    $stmt->execute([
        ':username' => $username,
        ':email' => $email,
        ':password' => $hashed
    ]);

    echo json_encode(["success" => true, "message" => "User registered successfully."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Server error: " . $e->getMessage()]);
}
