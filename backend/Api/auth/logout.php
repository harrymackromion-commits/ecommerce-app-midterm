<?php
session_start();
include "../cors.php";

session_destroy();
echo json_encode(["success" => true, "message" => "Logged out successfully"]);
