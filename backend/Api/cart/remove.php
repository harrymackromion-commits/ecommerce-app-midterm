<?php
include "../cors.php";
session_start();

$input = json_decode(file_get_contents("php://input"), true);
$id = $input['id'] ?? null;

if (!isset($_SESSION['cart'])) $_SESSION['cart'] = [];
if ($id !== null) {
    $_SESSION['cart'] = array_filter($_SESSION['cart'], fn($item) => $item['id'] != $id);
}

echo json_encode(['success' => true, 'cart' => array_values($_SESSION['cart'])]);
