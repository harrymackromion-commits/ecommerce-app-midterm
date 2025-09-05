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

    $name = $_POST['name'] ?? null;
    $price = $_POST['price'] ?? null;
    $description = $_POST['description'] ?? null;

    if (!$name || !$price) {
        throw new Exception("Missing required fields");
    }

    $imageName = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . "/upload/";
        if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

        $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $imageName = uniqid() . "." . $ext;
        move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $imageName);
    }

    $product = new Product();
    $success = $product->create($name, $price, $imageName, $description, $user_id);

    echo json_encode([
        "success" => $success,
        "message" => $success ? "Product added successfully" : "Failed to add product"
    ]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
