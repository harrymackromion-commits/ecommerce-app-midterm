<?php
session_start();

class Cart
{

    // Add a product to the cart
    public static function add($product)
    {
        if (!isset($_SESSION['cart'])) {
            $_SESSION['cart'] = [];
        }

        $id = $product['id'];

        if (isset($_SESSION['cart'][$id])) {
            $_SESSION['cart'][$id]['quantity'] += intval($product['quantity']);
        } else {
            $_SESSION['cart'][$id] = [
                'id' => $id,
                'name' => $product['name'],
                'price' => floatval($product['price']),
                'quantity' => intval($product['quantity']),
                'image' => $product['image'],
            ];
        }

        return $_SESSION['cart'];
    }

    // Remove a product from the cart
    public static function remove($id)
    {
        if (isset($_SESSION['cart'][$id])) {
            unset($_SESSION['cart'][$id]);
        }
        return $_SESSION['cart'] ?? [];
    }

    // Get all cart items
    public static function get()
    {
        return $_SESSION['cart'] ?? [];
    }

    // Clear entire cart
    public static function clear()
    {
        $_SESSION['cart'] = [];
        return $_SESSION['cart'];
    }
}
