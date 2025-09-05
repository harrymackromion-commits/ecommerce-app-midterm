<?php
class User
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function register($username, $email, $password)
    {
        $stmt = $this->conn->prepare("SELECT user_id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->rowCount() > 0) {
            return ["success" => false, "message" => "Email already registered"];
        }

        $hashed = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $this->conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$username, $email, $hashed]);

        return ["success" => true, "message" => "Registration successful"];
    }

    public function login($email, $password)
    {
        $stmt = $this->conn->prepare("SELECT user_id, username, password FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !password_verify($password, $user["password"])) {
            return ["success" => false, "message" => "Invalid email or password"];
        }

        $_SESSION["user_id"] = $user["user_id"];
        $_SESSION["username"] = $user["username"];

        return ["success" => true, "message" => "Login successful", "user" => $user];
    }
    public function updateProfile($id, $username = null, $email = null, $password = null)
    {
        $updates = [];
        $params = [];

        if ($username) {
            $updates[] = "username = ?";
            $params[] = $username;
        }

        if ($email) {
            $updates[] = "email = ?";
            $params[] = $email;
        }

        if ($password) {
            $hashed = password_hash($password, PASSWORD_BCRYPT);
            $updates[] = "password = ?";
            $params[] = $hashed;
        }

        if (empty($updates)) {
            return false;
        }

        $params[] = $id;
        $sql = "UPDATE users SET " . implode(", ", $updates) . " WHERE user_id = ?";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute($params);
    }
}
