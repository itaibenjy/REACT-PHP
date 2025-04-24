<?php
require_once "../utils/session.php";

session_unset();
session_destroy();

echo json_encode(["success" => true, "message" => "Logged out."]);
