<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

$db_con = mysqli_connect("localhost", "root", "", "react_crud_app");
if ($db_con === false) {
    die("ERROR: Could not Connect to database" . mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];

echo json_encode("test " . $method);
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

    case "PUT":
        $taskPostData = json_decode(file_get_contents("php://input"));
        $taskId = $taskPostData->taskId;
        $taskName = $taskPostData->taskName;
        $taskInfo = $taskPostData->taskInfo;

        $queryResult = mysqli_query($db_con, "UPDATE tasks SET taskName = '$taskName', taskInfo = '$taskInfo' WHERE taskId = $taskId");

        if ($queryResult) {
            echo json_encode([
                "success" => true,
                "message" => "Task updated successfully",
                "task" => [
                    "taskId" => $taskId,
                    "taskName" => $taskName,
                    "taskInfo" => $taskInfo
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Something went wrong, please check the data"]);
        }
        return;


    case "DELETE":
        $path = explode('/', $_REQUEST["REQUEST_URI"]);
        if (isset($_GET['taskId'])) {
            $taskId = $_GET['taskId'];
            $queryResult = mysqli_query($db_con, "DELETE FROM tasks WHERE taskId = $taskId");

            if ($queryResult) {
                echo json_encode(["success" => true, "message" => "Task deleted successfully"]);
            } else {
                echo json_encode(["success" => false, "error" => "Failed to delete the task. Please check the data."]);
            }
        } else {
            echo json_encode(["success" => false, "error" => "Task ID not provided."]);
        }
        break;
}
