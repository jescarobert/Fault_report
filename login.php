<?php

$correct_username = "admin";
$correct_password = "password123";


$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';


if ($username === $correct_username && $password === $correct_password) {
    echo "success";
} else {
    echo "fail";
}
?>
