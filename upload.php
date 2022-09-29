<?php ?>

<!DOCTYPE html>
    <html lang="de">

<head>
    <title>MCmoderSD.live</title>
    <link rel="stylesheet" type="text/css" href="/content/style/index_style.php" />
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />

</head>

<body>

<form action="/phpscripts/uploader.php" method="post" enctype="multipart/form-data">
    Select image to upload:
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload Image" name="submit">
