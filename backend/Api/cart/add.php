<?php
include "../cors.php";
session_start();

$input = json_decode(file_get_contents("php://input"), true);
if (!isset($input['id'], $input['name'], $input['price'], $input['quantity'], $input['image'])) {
    echo json_encode(['success' => false, 'message' => 'Product info required']);
    exit;
}

$product_id = $input['id'];
$quantity = intval($input['quantity']);
if (!isset($_SESSION['cart'])) $_SESSION['cart'] = [];

$found = false;
foreach ($_SESSION['cart'] as &$item) {
    if ($item['id'] == $product_id) {
        $item['quantity'] += $quantity;
        $found = true;
        break;
    }
}
unset($item);

if (!$found) {
    $_SESSION['cart'][] = $input; 
}

echo json_encode(['success' => true, 'cart' => $_SESSION['cart']]);
