<?php
include "../cors.php";
require_once "../classes/Product.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    $product = new Product();
    $products = $product->getAll();

    foreach ($products as &$p) {
        if (!empty($p['image'])) {
            $p['image'] = "http://localhost:8000/api/product/upload/" . $p['image'];
        }
    }

    echo json_encode([
        "success" => true,
        "products" => $products
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
