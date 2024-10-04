<?php
error_reporting(E_ALL);
ini_set('display_errirs', 1);

header('Access-Control-Allow-Origin:* ');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

$db_con = mysqli_connect("localhost", "root", "", "react_crud_app");
if ($db_con === false) {
    die("ERROR: Could not Connect to database" . mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];

// echo "test " . $method;
switch ($method) {
    case "GET":
        $allTasks = mysqli_query($db_con, "SELECT * FROM tasks");
        if (mysqli_num_rows($allTasks) > 0) {
            while ($row = mysqli_fetch_array($allTasks)) {
                $json_array["taskdata"][] = array("taskId" => $row['taskId'], "taskName" => $row["taskName"], "taskInfo" => $row["taskInfo"]);
            }
            echo json_encode($json_array["taskdata"]);
            return;
        } else {
            echo json_encode(["result" => "Please check the Data"]);
            return;
        }
        break;

    case "POST":
        $taskPostData = json_decode(file_get_contents("php://input"));

        $taskName = $taskPostData->taskName;
        $taskInfo = $taskPostData->taskInfo;

        $queryResult = mysqli_query($db_con, "INSERT INTO tasks (taskName, taskInfo) VALUES ('$taskName', '$taskInfo')");

        if ($queryResult) {
            echo json_encode(["succes" => "task added"]);
            return;
        } else {
            echo json_encode(["succes" => "Something went wrong, please check the data"]);
            return;
        }
        break;
    case "DELETE":
        $path = explode('/', $_SERVER["REQUEST_URI"]);

        // $result = mysqli_query($db_con, "DELETE from tasks WHERE taskId = '$path[4]'");

        break;
}
