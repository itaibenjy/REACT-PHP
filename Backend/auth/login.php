<?php

header("Access-Control-Allow-Origin: http://localhost:5173"); // or whatever your React port is
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


require_once "../config/database.php";
require_once "../utils/session.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$username = trim($data["username"] ?? "");
$password = $data["password"] ?? "";

if (!$username || !$password) {
    http_response_code(400);
    echo json_encode(["error" => "Username and password required."]);
    exit;
}

try {
    $db = new Database();
    $conn = $db->getConnection();

    $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute([':username' => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user["password"])) {
        $_SESSION["user_id"] = $user["id"];
        $_SESSION["username"] = $user["username"];
        $_SESSION["role"] = $user["role"];

        echo json_encode([
            "success" => true,
            "user" => [
                "id" => $_SESSION["user_id"],
                "username" => $_SESSION["username"],
                "role" => $_SESSION["role"]
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Invalid credentials."]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Server error: " . $e->getMessage()]);
}
