<?php
session_start();
include "../Database.php";
include "../cors.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

$db = new Database();
$conn = $db->connection();

$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");

if (!$email || !$password) {
    echo json_encode(["success" => false, "message" => "Email and password are required"]);
    exit;
}

$stmt = $conn->prepare("SELECT user_id, username, password FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($password, $user["password"])) {
    echo json_encode(["success" => false, "message" => "Invalid email or password"]);
    exit;
}

$_SESSION["user_id"] = $user["user_id"];
$_SESSION["username"] = $user["username"];

echo json_encode(["success" => true, "message" => "Login successful", "user" => $user]);
