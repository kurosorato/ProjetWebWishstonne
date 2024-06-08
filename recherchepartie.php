<?php

// [nbjoueur,idroom,...]


$contenu= file("parties.csv"); // donne la liste des parties
$listpartie = array();
foreach ($contenu as $ligne){
  $tmp = explode(",",$ligne);
  if($tmp[0] == "-"){

  }
  else{
    $listpartie[] = [$tmp[0], $tmp[1]];
  }

}
echo json_encode( $listpartie); // evoie juste le nombre de joueurs et l'id de la partie


