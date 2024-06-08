<?php


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start(); 

    


    $cartes = file_get_contents('php://input');
    //$cartes = json_decode($cartes,true);






    $contenu= file("parties.csv"); // donne la liste des parties


    foreach ($contenu as $ligne){
        $tmp = explode(",",$ligne);
    
        if ( $_SESSION["idroom"] == $tmp[1] ){
            if($tmp[0]== 1){   // si il y a 1 joueur
                if ( $_SESSION["nbjoueur"] == 2 ){
                    echo json_encode(7);
                    return;
                }
                else{
                    echo json_encode(2); // code en attente de joueur
                    return;
                }
            }
            else{
                $_SESSION["nbjoueur"]=2;
            }
        }
    }



    //======partie en jeu ====

    if ( $_SESSION["joueur"] == 1){ // premier joueur

        $encour = file("game".$_SESSION["idroom"].".csv"); // le joueur qui doit jouer

        if ( $encour[0] == 1 && $_SESSION["tour"] == 0 && $_SESSION["donnees"] == 0){
            echo file_get_contents("data".$_SESSION["idroom"]."2.json");
            file_put_contents("data".$_SESSION["idroom"].".json", $cartes);
            $_SESSION["donnees"]=1;
            return;
        }


        if ( $encour[0] == 1 && $_SESSION["tour"] == 0) { // met le tour du joueur 1 a 1 pour dire que c'est son tour si le joueur 2 a jouer
            $_SESSION["tour"] = 1;
            file_put_contents("data".$_SESSION["idroom"].".json", $cartes);
            echo json_encode(9); // annonce au joueur que c'est son tour
            return;
        }

        if ( $_SESSION["tour"] == 1 ){ //et c'est son tour
            file_put_contents("data".$_SESSION["idroom"].".json", $cartes);
            $file = file_get_contents("data".$_SESSION["idroom"].".json");
            $files = json_decode($file,true);

            if ( $files[1] == 1  ){ // pour dire qu'il met fin a son tour
                file_put_contents("game".$_SESSION["idroom"].".csv","2");
                file_put_contents("data".$_SESSION["idroom"].".json", $cartes);
                $_SESSION["tour"] = 0;
                $_SESSION["donnees"]=0;
                $_SESSION["donneok"] = 0;
                echo json_encode(5); // code fin de tour
                return;
            }
            return;
        }

        if ( $_SESSION["donneok"] == 0 ){
            $_SESSION["donneok"] = 1;
            return;
        }

        if ( $_SESSION["donneok"] == 1 ){
            echo file_get_contents("data".$_SESSION["idroom"]."2.json");
            return;
        }
    }



    if ( $_SESSION["joueur"] == 2 ){ // 2em joueur 

        $encour = file("game".$_SESSION["idroom"].".csv"); // le joueur qui doit jouer

        if ( $encour[0] == 2 && $_SESSION["tour"] == 0 && $_SESSION["donnees"] == 0){
            echo file_get_contents("data".$_SESSION["idroom"].".json");
            file_put_contents("data".$_SESSION["idroom"]."2.json", $cartes);
            $_SESSION["donnees"]=1;
            return;
        }


        if ( $encour[0] == 2 && $_SESSION["tour"] == 0) { // met le tour du joueur 2 a 2 pour dire que c'est son tour
            $_SESSION["tour"] = 1;
            echo json_encode(9); // annonce au joueur que c'est son tour
            file_put_contents("data".$_SESSION["idroom"]."2.json", $cartes);
            return;
        }

        if ( $_SESSION["tour"] == 1 ){ //et c'est son tour
            file_put_contents("data".$_SESSION["idroom"]."2.json", $cartes);
            $file = file_get_contents("data".$_SESSION["idroom"]."2.json");
            $files = json_decode($file,true);
    

            if ( $files[1] == 1  ){ // pour dire qu'il met fin a son tour
                file_put_contents("game".$_SESSION["idroom"].".csv","1");
                file_put_contents("data".$_SESSION["idroom"]."2.json", $cartes);
                $_SESSION["tour"] = 0;
                $_SESSION["donnees"]=0;
                $_SESSION["donneok"] = 0;
                echo json_encode(5); // code fin de tour
                return;
            }
            return;
        }

        if ( $_SESSION["donneok"] == 0 ){
            $_SESSION["donneok"] = 1;
            return;
        }

        if ( $_SESSION["donneok"] == 1 ){
            echo file_get_contents("data".$_SESSION["idroom"].".json");
            return;
        }
    }

}
