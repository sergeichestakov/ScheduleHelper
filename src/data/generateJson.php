<?php
$servername = "localhost";
$username = "root";
$password = "cows4life";
$dbname = "ucd";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

$ratings = array();

$sql = "select * from ratemyprofessor";

$conn->query('SET NAMES utf8'); // Allows special characters.
mysqli_set_charset ( $mysqli,'utf8');
$result = $conn->query($sql); // Stores Mysql Data

if ($result->num_rows > 0) {
    // output data of each row
  while($row = $result->fetch_assoc()) { // Will store everything into the php array
  	$url = $row['url'];
  	$url = strstr($url, '='); $url = str_replace("=", "", $url);
  	$last = trim($row["last"]);
  	$first = trim($row["first"]);
  	$ratings[$last][$first[0]]['url'] = $url;
  	$ratings[$last][$first[0]]['quality'] = trim($row["quality"]);
  	$ratings[$last][$first[0]]['diff'] = trim($row["diff"]);
    }
}

echo json_encode($ratings); // Generates the json


$conn->close();
?>
