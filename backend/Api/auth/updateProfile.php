<?php
session_start();

include "../cors.php";
require_once "../Database.php";
require_once "../classes/User.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit();
}

try {
    $db = new Database();
    $conn = $db->connection();
    $user = new User($conn);

    $data = json_decode(file_get_contents("php://input"), true);
    $username = trim($data['username'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = trim($data['password'] ?? '');

    if (!$username && !$email && !$password) {
        echo json_encode(["success" => false, "message" => "No changes submitted"]);
        exit();
    }

   
    $updated = $user->updateProfile($_SESSION['user_id'], $username, $email, $password);

    if ($updated) {
        if ($username) $_SESSION['username'] = $username; 
        echo json_encode(["success" => true, "message" => "Profile updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Update failed"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
