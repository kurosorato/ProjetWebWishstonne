<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start(); 


    $contenu= file("parties.csv"); // donne la liste des parties

    $data="";
    foreach ($contenu as $ligne){
        $tmp = explode(",",$ligne);

        if ( $tmp[1] == $_SESSION["idroom"] ){ // si l'id de la room est la meme que celle que l'utilisateur a demandé
            if($tmp[0]== 2){   // s'il y a 2 joueur
                $tmp2 = str_replace("\n","",$ligne);
                $tmp3 = explode(",",$tmp2);
                $data = $data."1,".$tmp3[1];

                if ($tmp3[2] == session_id()){ // si c'est le premier joueur
                    $data = $data.",".$tmp3[3]."\n"; 
                }
                else{
                    $data = $data.",".$tmp3[2]."\n"; 
                }
                
            }
            else{ // s'il y a 1 joueur
                unlink("data".$_SESSION["idroom"].".json");
                unlink("data".$_SESSION["idroom"]."2.json");
                unlink("game".$_SESSION["idroom"].".csv");
            }
        }
        else{
            $data = $data.$ligne;
        }
    }
    session_destroy();


    file_put_contents('parties.csv', $data);
}

