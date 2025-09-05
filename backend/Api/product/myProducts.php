<?php
include "../cors.php";
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "../classes/Product.php";

try {
    if (!isset($_SESSION['user_id'])) {
        throw new Exception("Unauthorized");
    }
    $user_id = $_SESSION['user_id'];

    $product = new Product();
    $products = $product->getByUserId($user_id);

    foreach ($products as &$p) {
        if (!empty($p['image'])) {
            $p['image'] = "http://localhost:8000/api/product/upload/" . $p['image'];
        }
    }

    echo json_encode(["success" => true, "products" => $products]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
