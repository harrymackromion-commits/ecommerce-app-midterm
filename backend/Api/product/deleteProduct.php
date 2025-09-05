<?php
include "../cors.php";
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../classes/Product.php';

try {
    if (!isset($_SESSION['user_id'])) {
        throw new Exception("Unauthorized");
    }
    $user_id = $_SESSION['user_id'];

    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? null;

    if (!$id) {
        throw new Exception("Product ID is required");
    }

    $product = new Product();
    $success = $product->delete($id, $user_id);

    echo json_encode([
        "success" => $success,
        "message" => $success ? "Product deleted" : "Failed to delete product"
    ]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
