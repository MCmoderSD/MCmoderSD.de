<?php
ini_set('upload_max_filesize', '100M');
if (isset($_FILES['image']) && is_uploaded_file($_FILES['image']['tmp_name'])) {
    $file = $_FILES['image'];

    // Validate the file
    if ($file['error'] !== UPLOAD_ERR_OK) {
        // An error occurred
        exit;
    }

    // Process the file
    $file_name = basename($file['name']);
    $file_path = "images/$file_name";
    if (move_uploaded_file($file['tmp_name'], $file_path)) {
        // File was successfully uploaded
        echo "File was uploaded successfully";
    } else {
        // There was an error uploading the file
        echo "There was an error uploading the file";
    }
}
