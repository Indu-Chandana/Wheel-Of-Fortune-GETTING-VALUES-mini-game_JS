<?php 
    // $existingNames = array("1" ,"3" ,"5" ,"7" ,"8" );
    $existingNames = rand(1,8);

    if (isset($_POST['suggestion'])) {
        $name = $_POST['suggestion'];

            if ($name == 8) {
                // echo "Congratulations, You WON ...";
                echo "true";
                // echo $existingNames;
            } else {
                // echo "OHH Try at another time ...";
                echo "false";
                // echo $existingNames;
            }
        
    }

?>