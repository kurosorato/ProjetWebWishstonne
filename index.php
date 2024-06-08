<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Wishstone</title>
    <link href="menu.css" rel="stylesheet" type="text/css">
    <script
  src="https://code.jquery.com/jquery-3.6.4.min.js"
  integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8="
  crossorigin="anonymous"></script>
    <script src="menu.js"></script>
</head>


<body>


    <div id="popup"> <p id="popupinfo"> sqdqsdqsdqsdqdqsqdqsd</p> </div>

    <div class="menu">

        <div class="titre" id="titredujeu">
            <p>Wishstone</p>
        </div>
        
        <div id="listePartie" class="choix">
            <img src="images/menu_touche.png">
            <p onclick="nouvellePartie()"> créer une partie </p>
            <img src="images/menu_touche.png">
            <p onclick="rechercherPartie()"> rechercher une partie </p>
        </div>

    </div>


</body>