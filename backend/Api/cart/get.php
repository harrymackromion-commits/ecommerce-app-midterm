<?php
include "../cors.php";
session_start();

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

echo json_encode([
    'success' => true,
    'cart' => $_SESSION['cart']
]);
