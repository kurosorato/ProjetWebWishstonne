
<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    session_start(); 

    $contenu= file("parties.csv"); // donne la liste des parties

    $id=0;
    foreach ($contenu as $ligne){
        $id=$id+1;
    }

    if ($id==8){ // si le nombre de parties est de 7 on en crée pas plus
        echo json_encode(1); // code erreur perso
        return;
    }

    else{
        $_SESSION["idroom"]=$id;
        $_SESSION["joueur"]=1;
        $_SESSION["tour"]=0;
        $_SESSION["nbjoueur"] = 1;
        $_SESSION["donnees"] = 0;
        $_SESSION["donneok"] = 0;
        

        $tmp = str_replace("-,-,-","1,".$id.",".session_id()."\n-,-,-",$contenu);
        file_put_contents('parties.csv', $tmp);
        file_put_contents("game".$id.".csv","1");
        file_put_contents("data".$_SESSION["idroom"].".json",'{"1":0,"2":"empty","3":0,"4":"empty","5":0,"6":"empty","7":0,"8":"empty","9":0,"10":"empty","11":0,"12":"empty","13":0,"14":"empty","15":0,"16":"empty","17":0,"18":40,"19":40}');
        file_put_contents("data".$_SESSION["idroom"]."2.json",'{"1":0,"2":"empty","3":0,"4":"empty","5":0,"6":"empty","7":0,"8":"empty","9":0,"10":"empty","11":0,"12":"empty","13":0,"14":"empty","15":0,"16":"empty","17":0,"18":40,"19":40}');
        echo json_encode(0);
    }

}
