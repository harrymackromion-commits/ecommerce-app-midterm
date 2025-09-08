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

try {
    $order = new Order();
    $rows = $order->getByUser($_SESSION['user_id']);

    $orders = [];
    foreach ($rows as $row) {
        $id = $row['id'];
        if (!isset($orders[$id])) {
            $orders[$id] = [
                "order_id" => $id,
                "total_price" => $row['total_price'],
                "created_at" => $row['created_at'],
                "items" => []
            ];
        }
        $orders[$id]['items'][] = [
            "product_id" => $row['product_id'],
            "name" => $row['name'],
            "image" => !empty($row['image']) ? "http://localhost:8000/api/product/upload/" . $row['image'] : null,
            "quantity" => $row['quantity'],
            "price" => $row['price']
        ];
    }

    echo json_encode(["success" => true, "orders" => array_values($orders)]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
