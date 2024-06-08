<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Wishstone</title>
    <link href="style.css" rel="stylesheet" type="text/css">
    <script
  src="https://code.jquery.com/jquery-3.6.4.min.js"
  integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8="
  crossorigin="anonymous"></script>
    <script src="function.js"></script>
</head>


<body>

    <section>
        <div id="popup"> <p id="popupinfo"> sqdqsdqsdqsdqdqsqdqsd</p> </div>
        <div class="cadre1"></div>
        <div class="cadre2"></div>
        <div id="passerTour"> <img src="images/fin_tour.png"></div>

        <div id="quitter"> <img src="images/fin_tour.png"> <p>Abandonner</p> <div id="quitterbutton" onclick="quitter()"></div> </div>

        <div class="joueur1">
            <div id="zoneAttaque" onclick="attaquerJoueur()" ></div>
            <div id="joueur1Deck" class="card">
                 <div class="carte"></div>
                 <div class="carte"></div>
                 <div class="carte"></div>
                 <div class="carte"></div>
                 <div class="carte"></div>
            </div>
            <div id="joueur1Jeu" class="card1">
            </div>
        </div>
        <div id="vieEnnemie"><img src="images/pts.png"> <p id="vieennemie"></p> </div>


        <div class="joueur2">
            <div id="joueur2Jeu" class="card1"> </div>
            <div id="joueur2Deck" class="card">
                <script> ajout();</script>
            </div>
            <div class="viezone"><img src="images/pts.png"> <p id="viejoueur"><script> afficherVie();</script></p> </div>
        </div>


    </section>


</body>