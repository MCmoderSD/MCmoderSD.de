<?php
$host = 'MCmoderSD.de';
$port = 3306;
$user = 'FlappyRead';
$database = 'FlappyBirdLeaderboard'; // Ersetzen Sie 'your_database_name' durch den Namen Ihrer Datenbank

$connection = new mysqli($host, $user, '', $database, $port);
if ($connection->connect_error) {
    die('Verbindung zur Datenbank fehlgeschlagen: ' . $connection->connect_error);
}

$query = 'SELECT * FROM leaderboard'; // Ersetzen Sie 'leaderboard' durch den Namen Ihrer Tabelle

$result = $connection->query($query);
if (!$result) {
    die('Abfragefehler: ' . $connection->error);
}

$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

header('Content-Type: application/json');
echo json_encode($data);

$result->free_result();
$connection->close();