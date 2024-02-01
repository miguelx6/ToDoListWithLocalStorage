<?php
$jsonFile = 'data.json';

function getData() {
    global $jsonFile;
    $data = file_get_contents($jsonFile);
    return json_decode($data, true);
}

function saveData($data) {
    global $jsonFile;
    $json = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents($jsonFile, $json);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $tasks = getData()['tasks'];
    echo json_encode($tasks);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tasks = getData()['tasks'];
    $task = [
        'id' => uniqid(),
        'name' => $_POST['name'],
        'description' => $_POST['description'],
        'status' => $_POST['status'],
    ];
    $tasks[] = $task;
    $data = [
        'tasks' => $tasks,
    ];
    saveData($data);
    echo json_encode($task);

    // echo json_encode($_POST);

    // $data = [
    //     'name' => $_POST['name'],
    //     'description' => $_POST['description'],
    //     'status' => $_POST['status'],
    // ];
    // echo json_encode($data);
}
?>