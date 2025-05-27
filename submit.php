<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "must_reports";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$title = $_POST['title'];
$desc = $_POST['description'];
$location = $_POST['location'];

$stmt = $conn->prepare("INSERT INTO reports (title, description, location) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $title, $desc, $location);

if ($stmt->execute()) {
    echo "Report submitted successfully.";
} else {
    echo "Error: " . $conn->error;
}
?>