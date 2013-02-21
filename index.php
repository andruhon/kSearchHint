<?php
    if (isset($_POST['search'])) {
        include 'array.php';
        
        //TODO: Mary, please use foreach(), stripos() and levenshtein()
        //see also array_push, array_unshift
        $searchString = $_POST['search'];
        
        $resultArray = array(); //put relevant words in this array
        
        foreach($citiesAndTowns as $city){
            $comparePos = stripos($city, $searchString);
            if ($comparePos!==false){
                if ($comparePos==0) {
                    array_unshift($resultArray, $city);
                } else {
                    array_push($resultArray, $city);
                }
            } else {
                $compareLeven = levenshtein($searchString, $city);
                if ($compareLeven >= 0 && $compareLeven < 3){
                    array_push($resultArray, $city);
                }
            }
        }
        
        
        echo json_encode($resultArray);
        exit();
    }
?><!DOCTYPE html>
<html>
<head>
    <title>kSearchHint example</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="js/kSearchHint.js"></script>
    <link href="css/style.css" rel="stylesheet" type="text/css">
</head>
<body>
<h1>kSearchHint</h1>
<h3>Start typing name of one of New Zealand's town or city</h3>
<small>For example Hamilton</small>
<div class="hintable">
    <input type="text" id="search"/>
</div>
<script>
    kSearchHint({
        input: '#search',
        url: '',
        textName: 'search'
    });
</script>
<p>Use keyboard up and down arrows to navigate through suggestions. Press right arrow to choose one. Of course you can use mouse click too.</p>


</body>
</html>