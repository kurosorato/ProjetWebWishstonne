var inpopup=false; //savoir si un popup est affiché ou non

function nouvellePartie() { // crée une nouvelle partie (demande au serveur)
    demandeajax2();
}

function demandeajax2(){ // fait une demande ajax au serveur pour créer une partie
    $.ajax({
        type: "POST",
        url: "creepartie.php",
        data: "",
        dataType: "json",
        success: function (response) {    // repond avec [ [nbjoueur,idroom,...],[nbjoueur,idroom,...] ]
            redirection(response);      
        }
    });
}

function redirection(autorisation) {
    if(autorisation == 0){
        document.location = 'partie.php';
    } else {popup(msg="Trop de parties en cours");}

}

function rechercherPartie(){   // demande au serveur s'il y a des nouvelle parties
    nouveauMenu();
    setInterval(demandeajax, 10000);
    demandeajax();
}

function demandeajax(){ // fait une demande ajax au serveur
    $.ajax({
        type: "POST",
        url: "recherchepartie.php",
        data: "",
        dataType: "json",
        success: function (response) {    // repond avec [ [nbjoueur,idroom,...],[nbjoueur,idroom,...] ]
            listeRoom(response);
        }
    });
}

function nouveauMenu(){  //change le html pour afficher les parties existantes
    var content = "<div></div>";
    document.getElementById("listePartie").innerHTML= content;
    document.getElementById("listePartie").style.height="450px";
    document.getElementById("listePartie").style.width="850px";
    document.getElementById("listePartie").style.top="150px";
    document.getElementById("titredujeu").style.top="50px";
}

//id=[ [id,nbjoueur],[id,nbjoueur],[id,nbjoueur] ]
function listePartie(id){ // crée la liste des parties disponibles
    var content="<div class='list'>";
    for(i=0; i<id.length; i++){
        console.log(id,id[i]);
        if(id[i][0] == 1){
            content+= "<div class='trigger' onclick='rejoindre(" +id[i][1]+")'>";
        }
        else{
            content+= "<div class='trigger'>";
        }
        content+= "<div class='partie'>";
        content+= "<img class='icon' src=" + "images/pts.png" + ">";
        content+= "<p class='idListe'> room: "+i+ " "+"id: " +id[i][1]+"</p>";
        content+= "<p class='nbJoueur'> Nombre de joueur: "+id[i][0]+"/2 </p>";
        content+= "</div>"+"</div>";
    }
    content+= "</div>";
    content += '<div id="quitter"> <img src="images/fin_tour.png"> <p>Retour</p> <div id="quitterbutton" onclick="quitter()"></div> </div>';
    return content;
}

function listeRoom(rep) { //crée la liste des parties
    content=listePartie(rep);
    document.getElementById("listePartie").innerHTML=content;
}

// appel de cette fonction quand on clique sur une room -> prend en entree l'id de la room
function rejoindre(id) {
    sendData(id);
    document.location = 'partie.php';
}

function sendData(ids) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "rejoindrePartie.php", true);
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhr.onload = function() {
    // Ce qui sera fait si tout se passe bien
    // e.g. : alert(xhr.response)
    };
    xhr.onerror = function() {
    // Ce qui sera fait si problème
    // e.g. : alert("Erreur lors de l'envoi du message.");
    };
    xhr.send(JSON.stringify(ids));
}

function popup(msg="probleme") { //message d'info à l'utilisateur
    if(inpopup==false){
        inpopup = true;
        document.getElementById("popupinfo").innerHTML=msg;
        document.getElementById("popup").style.display="flex";
        setTimeout(popupoff,3000);
    }
}

function popupoff() { //fin du message
    document.getElementById("popup").style.display="none";
    inpopup = false;
}

function quitter(){
    document.location = 'index.php';
}