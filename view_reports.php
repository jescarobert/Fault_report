<?php
session_start();
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    die("Access denied.");
}

$conn = new mysqli("localhost", "root", "", "must_reports");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT * FROM reports ORDER BY report_date DESC");
?>
<!DOCTYPE html>
<html>
<head>
  <title>View Reports</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container"  >
    <h2>Submitted Reports</h2>
    <table border="1" cellpadding="10">
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Description</th>
        <th>Location</th>
        <th>Date</th>
      </tr>
      <?php while($row = $result->fetch_assoc()): ?>
      <tr>
        <td><?= $row['id'] ?></td>
        <td><?= htmlspecialchars($row['title']) ?></td>
        <td><?= htmlspecialchars($row['description']) ?></td>
        <td><?= htmlspecialchars($row['location']) ?></td>
        <td><?= $row['report_date'] ?></td>
      </tr>
      <?php endwhile; ?>
    </table>
  </div>
</body>
</html>