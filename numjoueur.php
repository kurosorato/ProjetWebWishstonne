<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start(); 

    echo json_encode($_SESSION["joueur"]);
    
}