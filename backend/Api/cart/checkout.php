<?php
session_start();
include "../classes/Order.php";
include "../cors.php";

header("Content-Type: application/json");

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Not authenticated"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['cartItems']) || !isset($data['totalPrice'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

try {
    $order = new Order();
    $order_id = $order->create($_SESSION['user_id'], $data['cartItems'], $data['totalPrice']);

    if (isset($_SESSION['cart'])) {
        unset($_SESSION['cart']);
    }

    echo json_encode(["success" => true, "order_id" => $order_id]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
