<?php
require_once "../Database.php";

class Order
{
    private $conn;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connection();
    }

    // Create new order
    public function create($user_id, $cartItems, $total_price)
    {
        try {
            $this->conn->beginTransaction();

            // Insert into orders
            $stmt = $this->conn->prepare("INSERT INTO orders (user_id, total_price) VALUES (?, ?)");
            $stmt->execute([$user_id, $total_price]);
            $order_id = $this->conn->lastInsertId();

            // Insert items
            $stmtItem = $this->conn->prepare("
                INSERT INTO order_items (order_id, product_id, quantity, price)
                VALUES (?, ?, ?, ?)
            ");
            foreach ($cartItems as $item) {
                $stmtItem->execute([$order_id, $item['id'], $item['quantity'], $item['price']]);
            }

            $this->conn->commit();
            return $order_id;
        } catch (Exception $e) {
            $this->conn->rollBack();
            throw $e;
        }
    }

    // Get orders of a buyer
    public function getByUser($user_id)
    {
        $stmt = $this->conn->prepare("
            SELECT o.id, o.total_price, o.created_at, oi.product_id, oi.quantity, oi.price, p.name, p.image
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            WHERE o.user_id = ?
            ORDER BY o.created_at DESC
        ");
        $stmt->execute([$user_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Get orders of a seller (who posted the product)
    public function getBySeller($seller_id)
    {
        $stmt = $this->conn->prepare("
            SELECT o.id AS order_id, o.total_price, o.created_at,
                   u.username AS buyer, oi.quantity, oi.price,
                   p.name AS product_name, p.image
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            JOIN users u ON o.user_id = u.user_id
            WHERE p.user_id = ?
            ORDER BY o.created_at DESC
        ");
        $stmt->execute([$seller_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}
