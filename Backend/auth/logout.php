<?php

header("Access-Control-Allow-Origin: http://localhost:5173"); // or whatever your React port is
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "../utils/session.php";

session_unset();
session_destroy();

echo json_encode(["success" => true, "message" => "Logged out."]);
