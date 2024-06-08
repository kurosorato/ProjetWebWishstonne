
<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start(); 


    $idroom = json_decode(file_get_contents('php://input'), true); // recupère la donnée envoyée depuis le client

    $contenu= file("parties.csv"); // donne la liste des parties

    $data="";
    foreach ($contenu as $ligne){
        $tmp = explode(",",$ligne);

        if ( $tmp[1] == $idroom ){ // si l'id de la room est la même que celle que l'utilisateur a demandé
            if($tmp[0]== 1){   // s'il y a 1 joueur sinon pas bon
                $tmp2 = str_replace("\n","",$ligne);
                $tmp3 = explode(",",$tmp2);
                $data = $data."2,".$tmp3[1].",".$tmp3[2];
                $data = $data.",".session_id()."\n"; // ajoute l'id de session du joueur dans la liste
                $_SESSION["idroom"]=$idroom;
                $_SESSION["joueur"]=2;
                $_SESSION["tour"]=0;
                $_SESSION["nbjoueur"]=2;
                $_SESSION["donnees"] = 0;
                $_SESSION["donneok"] = 0;
            }
            else{ // la partie n'est pas rejointe (en cas de forçage )
                $data = $data.$ligne;
            }
        }
        else{
            $data = $data.$ligne;
        }
    }


    file_put_contents('parties.csv', $data);
}

