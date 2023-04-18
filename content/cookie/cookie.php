<?php
header('content-type: text/style; charset=utf-8');
?>

p {
    margin: 0;
}

*, *::before, *::after {
    box-sizing: border-box;
}

.overlay, .scare {
    position: fixed;

    top: 0;
    left: 0;

    height: 100vh;
    width: 100vw;
}

p.overlay-title {
    font-size: 24px;
    font-weight: 900;
    color: rgb(255, 255, 255);
    line-height: 1;

    margin-bottom: 16px;
}

.overlay-button {
    display: inline-flex;
    align-items: center;

    height: 40px;

    padding-right: 24px;
    padding-left: 24px;

    font-size: 16px;
    font-weight: 500;
    line-height: 1;

    border-radius: 4px;

    margin: 4px;

    cursor: pointer;
}

.overlay-buttons-wrapper {
    margin: 24px -8px -8px;
}

#accept-button {
    background-color: rgb(88, 101, 242);

    color: white;
}

#decline-button {
    color: rgb(88, 101, 242);

    border: 2px solid rgb(88, 101, 242);
}

p.overlay-description {
    font-size: 16px;
    font-weight: 400;
    color: rgba(240, 240, 240, 0.5);
    line-height: 1.25;
    margin-bottom: 16px;
}

a.overlay-link {
    display: inline-block;

    text-decoration: none;

    font-size: 16px;
    font-weight: 500;
    color: rgb(88, 101, 242);
    line-height: 1;

    position: relative;

    margin-top: 16px;
}

a.overlay-link::before {
    position: absolute;

    content: "";

    height: calc(50% + 4px);
    width: calc(100% + 8px);

    bottom: -4px;
    left: -4px;

    background-color: rgba(132, 94, 194, 0.1);
}

.overlay-body {
    max-width: 512px;

    text-align: center;

    font-family: "Inter", sans-serif;
}

.overlay[hidden] {
    display: none;
}

.overlay {
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #36393f;

    padding-right: 24px;
    padding-left: 24px;
}

.scare {
    z-index: 1;
}

video#video {
    height: 100%;
    width: 100%;

    object-fit: cover;
}

video#video::-webkit-media-controls-enclosure {
    display:none !important;
}   