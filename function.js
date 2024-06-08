//variables

var tour; //0=votre tour, 1=celui de l'adversaire
var joueur; //1 -> celui qui crée la partie
var end=false; //true si la partie est finie
var attente=true; //savoir si on attend un joueur
var played=false; //si le joueur a attaqué ou non
var inpopup=false; //savoir si un popup est affiché ou non
var vieJoueur=40;
var vieEnnemie=40;
var attaque=0; //attaque en cours (0 = pas d'attaque)
var plateau1=["empty", "empty","empty", "empty"]; //plateau  du joueur 1
var plateau2=["empty", "empty","empty", "empty"]; //plateau du joueur 2
var cartesenmain=["empty", "empty","empty", "empty", "empty"]; //main du joueur 2
var listedonnees=["empty", 0,"empty", 0, "empty", 0, "empty", 0, "empty", 0, "empty", 0,"empty", 0, "empty", 0];

//audio

var son_attaque = new Audio("sons/attaque.wav");
var son_victory = new Audio("sons/victory.wav");
var son_defeat = new Audio("sons/gameover.wav");
var son_card = new Audio("sons/card.mp3");
var son_turn = new Audio("sons/turn.mp3");
var son_popup = new Audio("sons/popup.mp3");

//classes

class Serviteurs {
    constructor(nom, vie, atk, img) {
      this.nom = nom;
      this.vie = vie;
      this.atk = atk;
      this.img = img;
    }
}

class ServiteursPlateau {
    constructor(nom, vie, atk, img, action) {
        this.nom = nom;
        this.vie = vie;
        this.atk = atk;
        this.img = img;
        this.action = action;
      }
}

//serviteurs (nom, vie, atk, img)

const mouton = new Serviteurs("mouton", 1, 1, "images/mouton.jpg");
const goblin = new Serviteurs("goblin", 2, 4, "images/gob.png");
const voleuse = new Serviteurs("voleuse", 3, 3, "images/voleuse.jpg");
const guerrier = new Serviteurs("guerrier", 8, 1, "images/guerrier.jpg");
const chasseur = new Serviteurs("chasseur", 1, 5, "images/nain_chasseur.jpg");
const orc = new Serviteurs("orc", 5, 2, "images/orc.jpg");
const mage = new Serviteurs("mage", 1, 6, "images/mage.jpg");
const seigneur = new Serviteurs("seigneur", 5, 5, "images/seigneur.jpg");

//début

function aleatoire(){ //fonction donnant un serviteur aléatoire
    number = Math.floor(Math.random() * 26);
    if (number<2) { // 2/26
        return mouton;
    } else if (number<6) { // 4/26
        return goblin;
    } else if (number<10) { // 4/26
        return voleuse;
    } else if (number<14) { // 4/26
        return guerrier;
    } else if (number<18) { // 4/26
        return chasseur;
    } else if (number<22) { // 4/26
        return orc;
    } else if (number<25) { // 3/26
        return mage;
    } else { // 1/26
        return seigneur;
    }
}

function jeux(){
    $.ajax({
        type: "method",
        url: "func1.php",
        data: "data",
        dataType: "json",
        success: function (response) {
        }
    });

}

window.addEventListener("load", (event) => {
    $.ajax({
        type: "post",
        url: "numjoueur.php",
        data: "data",
        dataType: "json",
        success: function (response) { //donne le numéro de joueur et votre tour
            if(response==1){
                tour=0;
                joueur=1;
            } else {
                tour=1;
                joueur=2;
            }
        }
    });
});

//popup

function popup(msg="probleme") { //message d'info à l'utilisateur
    if(inpopup==false){
        playMusic(son_popup);
        inpopup = true;
        document.getElementById("popupinfo").innerHTML=msg;
        document.getElementById("popup").style.display="flex";
        setTimeout(popupoff,2000);
    }
}

function popupmort(msg="resulat", son) { //message mort
    if (end==false){
        inpopup = true;
        end = true;
        playMusic(son);
        document.getElementById("popupinfo").innerHTML=msg;
        document.getElementById("popup").style.display="flex";
        setTimeout(quitter2,5000);
    }
}

function popupoff() { //fin du message
    if(end==false){
        document.getElementById("popup").style.display="none";
        inpopup = false;
    }
}

//tours

function passerTour(){ 
    if (end==false) {
        playMusic(son_turn);
        attaque=0; //au cas où vous avez choisi un serviteur sans attaquer
        document.getElementById("zoneAttaque").style.backgroundColor="";
        document.getElementById("passerTour").innerHTML='<img src="images/fin_tour.png">';
        tour=1; //tour adverse
        demandeajax(); //envoyer infos
    }
}

function debutTour() {
    tour=0;
    played=false; //action jouer une carte
    for(let i=0;i<4;i++){ //serviteurs peuvent de nouveau attaquer
        if (plateau2[i]!="empty"){
            plateau2[i].action=true;
        }
    }
    // À vous de jouer
    popup(msg="À vous de jouer !");
    document.getElementById("passerTour").innerHTML='<img src="images/fin_tour.png"> <p>Passer le tour</p> <div id="trigerBouton" onclick="passerTour()"></div>';
    
}

//autre

function playMusic(audio){
    audio.currentTime=0;
    audio.play();
}

function ajout() { //donne des cartes aléatoires
    let i=0;
    var content = "";
    while (i<5) {
        if(cartesenmain[i]=="empty"){
            cartesenmain[i]=aleatoire();
        }
        content += carte(cartesenmain[i], i);
        i++;
    }
    document.getElementById("joueur2Deck").innerHTML= content;
}

function placeplateau(plateau){ //vérifie les places libres du plateau
    i=0;
    while(i<4){
        if(plateau[i]=="empty"){
            return i;
        }
        i++;
    }
    return -1;
}

//affichage

function afficherVie(){
    document.getElementById("viejoueur").innerHTML=vieJoueur;
    document.getElementById("vieennemie").innerHTML=vieEnnemie;
    if (vieEnnemie <= 0){
        mort();
    }
    if (vieJoueur <= 0){
        mort2();
    }
}

function carte(serviteur, i){ //affichage des cartes en main
    var content = '<div class="carte" id="' +i+ '" onclick="ajoutcartejeux2(' +serviteur.nom+ ',' +i+ ')">'; //ajoutcartejeux2(serviteur, i)
    content+= "<div class='image'> <img class='illustration' src=" + serviteur.img + "></div>";  //l'image de la carte
    content+= "<img class='fond_nom' src=" + "images/nom.png" + ">"
    content+= "<p class='nom'>"+ serviteur.nom +"</p>" ;   //nom de la carte
    content+= "<p class='vie'>"+ serviteur.vie +"</p>" ;   //les pts de vie
    content+=  "<p class='atk'>"+ serviteur.atk +"</p>"+ "</div>";   //les pts d'atk
    return content;
}

function cartejeuxjoueur(){ //affichage du plateau1
    var content = ""
    for(let i=0; i<4; i++){
        if(plateau1[i]!="empty"){
            content+='<div class="carteEnJeu" id="carteN' +i+ '" onclick="attaquerServiteur(' +i+ ')">'; //attaquer(i)
            content+= "<div> <img class='cadre' src=" + 'images/cadre.png' + '> </div>';
            content+= "<div class='image'> <img class='illustration' src=" + plateau1[i].img  + "></div>";
            content+= "<p class='vieEnJeu'>"+plateau1[i].vie+"</p>" ;
            content+= "<p class='atkEnJeu'>"+plateau1[i].atk+"</p>"+ "</div>";
        }
    }
    return content;
}

function cartejeuxjoueur2(){ //affichage du plateau2
    var content = ""
    for(let i=0; i<4; i++){
        if(plateau2[i]!="empty"){
            content+='<div class="carteEnJeu" id="carteN' +i+ '" onclick="attaquer(' +i+ ')">'; //attaquer(i)
            content+= "<div> <img class='cadre' src=" + 'images/cadre.png' + '> </div>';
            content+= "<div class='image'> <img class='illustration' src=" + plateau2[i].img  + "></div>";
            content+= "<p class='vieEnJeu'>"+plateau2[i].vie+"</p>" ;
            content+= "<p class='atkEnJeu'>"+plateau2[i].atk+"</p>"+ "</div>";
        }
    }
    return content;
}

//actions

function ajoutcartejeux2(serviteur, i){ //jouer une carte
    if (end==true){
        //rien
    } else if (attente==false && tour==0){
        if(played){
            //message vous avez déjà joué une carte
            popup(msg="Vous avez déjà joué une carte ce tour-ci");
        } else {
            position = placeplateau(plateau2);
            if(position!=-1){
                playMusic(son_card);
                plateau2[position]=new ServiteursPlateau(serviteur.nom, serviteur.vie, serviteur.atk, serviteur.img, true);
                plateau2affichage = cartejeuxjoueur2();
                cartesenmain[i]="empty";
                ajout();
                document.getElementById("joueur2Jeu").innerHTML= plateau2affichage;
                played=true;
            } else {
                //envoyer message plateau plein
                popup(msg="Vous possédez trop de serviteurs");
            }
        }
    } else if (attente==false && tour==1) {
        //message ce n'est pas votre tour
        popup(msg="C'est au tour de l'adversaire");
    } else {
        //message attente de l'adversaire
        popup(msg="Veuillez attendre votre adversaire");
    }
}

function attaquer(i){
    if (end==true){
        //rien
    } else if (attente==false && tour==0){
        if (attaque == 0){ //si aucun serviteur n'attaque
            if (plateau2[i].action == true){
                plateau2[i].action = false;
                attaque = plateau2[i].atk;
                document.getElementById("zoneAttaque").style.backgroundColor="rgba(216, 0, 0, 0.452)";
            } else {
                //envoyer message serviteur a déjà attaqué
                popup(msg="Ce serviteur a déjà attaqué");
            }
        } else {
            //envoyer message serviteur en train d'attaquer
            popup(msg="Veuillez choisir un adversaire");
        }
    } else if (attente==false && tour==1) {
        //message ce n'est pas votre tour
        popup(msg="C'est au tour de l'adversaire");
    } else {
        //message attente de l'adversaire
        popup(msg="Veuillez attendre votre adversaire");
    }
}

function attaquerServiteur(i){
    if (end==true){
        //rien
    } else if (attente==false && tour==0){
        if (attaque != 0){ //si un serviteur attaque
            var vie_restante = plateau1[i].vie - attaque;
            attaque = 0;
            playMusic(son_attaque);
            if (vie_restante > 0){
                plateau1[i].vie = vie_restante;
                document.getElementById("joueur1Jeu").innerHTML= cartejeuxjoueur(plateau1);
            } else {
                mortserviteur(i);
            }
            document.getElementById("zoneAttaque").style.backgroundColor="";
        } else {
            //envoyer message "veuillez choisir le serviteur qui attaque"
            popup(msg="Veuillez choisir le serviteur qui attaque");
        }
    } else if (attente==false && tour==1) {
        //message ce n'est pas votre tour
        popup(msg="C'est au tour de l'adversaire");
    } else {
        //message attente de l'adversaire
        popup(msg="Veuillez attendre votre adversaire");
    }
}

function mortserviteur(i){
    plateau1[i] = "empty";
    document.getElementById("joueur1Jeu").innerHTML= cartejeuxjoueur(plateau1);
}

function attaquerJoueur(){
    if (end==true){
        //rien
    } else if (attente==false && tour==0){
        if (attaque != 0){
            vieEnnemie -= attaque;
            attaque = 0;
            playMusic(son_attaque);
            afficherVie();
            document.getElementById("zoneAttaque").style.backgroundColor="";
        } else {
            //envoyer message
            popup(msg="Veuillez choisir le serviteur qui attaque");
        }
    } else if (attente==false && tour==1) {
        //message ce n'est pas votre tour
        popup(msg="C'est au tour de l'adversaire");
    } else {
        //message attente de l'adversaire
        popup(msg="Veuillez attendre votre adversaire");
    }
}


//fin

function mort(){ // quand l'ennemie est mort
    popupmort(msg="Vous avez gagné !", son_victory);
}

function mort2(){ // quand le joueur est mort
    popupmort(msg="Vous avez perdu !", son_defeat);
}

function quitter() {
    if (end==false){
        vieJoueur=0;
        demandeajax();
        quitter2();
    }
}

function quitter2() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "quitterpartie.php", true);
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhr.onload = function() {
    // Ce qui sera fait si tout se passe bien
    // e.g. : alert(xhr.response)
    };
    xhr.onerror = function() {
    // Ce qui sera fait si problème
    // e.g. : alert("Erreur lors de l'envoi du message.");
    };
    xhr.send();
    document.location = 'index.php';
}

////////////////////////////////////////

function transformerData(){
    for(let i=0;i<4;i++){
        if (plateau1[i]=="empty"){
            listedonnees[i*2] = "empty";
            listedonnees[(i*2)+1] = 0;
        } else {
            listedonnees[i*2] = plateau1[i].nom;
            listedonnees[(i*2)+1] = plateau1[i].vie;
        }
        if (plateau2[i]=="empty"){
            listedonnees[(i*2)+8] = "empty";
            listedonnees[(i*2)+9] = 0;
        } else {
            listedonnees[(i*2)+8] = plateau2[i].nom;
            listedonnees[(i*2)+9] = plateau2[i].vie;
        }
    }
}

function demandeajax(data){ // fait une demande ajax au serveur
    transformerData();
    $.ajax({
        type: "POST",
        url: "enGame.php",
        data: JSON.stringify({
            1:tour,
            2:listedonnees[0], //plateau
            3:listedonnees[1],
            4:listedonnees[2],
            5:listedonnees[3],
            6:listedonnees[4],
            7:listedonnees[5],
            8:listedonnees[6],
            9:listedonnees[7], //
            10:listedonnees[8], //
            11:listedonnees[9],
            12:listedonnees[10],
            13:listedonnees[11],
            14:listedonnees[12],
            15:listedonnees[13],
            16:listedonnees[14],
            17:listedonnees[15], //fin plateau
            18:vieJoueur,
            19:vieEnnemie,
        }),
        dataType: "json",
        success: function (response) {
            console.log(response);
            recupererData(response); //transforme les données reçues
        }
    });
}

function recupererData(response){
    if (response == 2){ //en attente d'un joueur
        attente=true;
    } else{
        attente=false;
        if (response == 5){ //fin du tour
            console.log("tour passé");
        } else if (response==7){ //adversaire a abandonné
            mort();
        } else if (response == 9){ //début du tour
            debutTour();
        } else { //données
            const empty = "empty";
            if(response.hasOwnProperty(2)){ //vérifie que ce n'est pas juste {1:x}
                for(let i=0; i<4; i++){
                    if (response[i*2+2]!="empty"){
                        ajoutcartejeux(plateau2, eval(response[i*2+2]), response[i*2+3], i);
                    } else {
                        plateau2[i] = "empty";
                    }
                    if (response[i*2+10]!="empty"){
                        ajoutcartejeux(plateau1, eval(response[i*2+10]), response[i*2+11], i);
                    } else {
                        plateau1[i] = "empty";
                    }
                };
            }
            vieEnnemie = response[18];
            vieJoueur = response[19];
            afficherVie();
        }
    }
}

function ajoutcartejeux(plateau, serviteur, pv, place){ //met a jour le plateau grace aux données
    plateau[place]=new ServiteursPlateau(serviteur.nom, pv, serviteur.atk, serviteur.img, true);
    document.getElementById("joueur1Jeu").innerHTML= cartejeuxjoueur();
    document.getElementById("joueur2Jeu").innerHTML= cartejeuxjoueur2();
}

setInterval(demandeajax, 2000);