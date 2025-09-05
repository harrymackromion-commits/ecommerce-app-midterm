<?php
session_start();
include "../cors.php";

if (isset($_SESSION["user_id"])) {
    echo json_encode([
        "success" => true,
        "user" => [
            "user_id" => $_SESSION["user_id"],
            "username" => $_SESSION["username"]
        ]
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Not authenticated"]);
}
