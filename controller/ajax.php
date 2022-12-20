<?php

require '../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;

$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();


$spreadsheet = $reader->load("../Sample.xlsx");

$sheetNames = $spreadsheet->getSheetNames();

$sheetCount = count($sheetNames);

// echo $sheetCount;
// echo '<br>';

$info = array();
$colors = array();

$category = array();
foreach ($sheetNames as $province) {
    $sheetData = $spreadsheet->getSheetByName($province)->toArray();
    unset($sheetData[0]);
    for ($k=1; $k <= count($sheetData); $k++) { 
        unset($sheetData[0]);
        if($sheetData[$k][0]!=null){
            array_push($category, $sheetData[$k][0]);
        }
    }
}
$category = array_unique($category);
$firstSheetData = $spreadsheet->getSheetByName($sheetNames[0])->toArray();
for ($k=1; $k <= count($firstSheetData); $k++) { 
    unset($firstSheetData[0]);
    $colors[$k-1] = $firstSheetData[$k][2]!=null?$firstSheetData[$k][2]:"blue";
}
for ($sheetIndex=0; $sheetIndex < $sheetCount; $sheetIndex++) { 
    if($sheetNames[$sheetIndex]!=null){
        $info[$sheetIndex]['name'] = $sheetNames[$sheetIndex];
    }
    // echo $sheetNames[$sheetIndex];
    // echo $info[$sheetIndex]['name'];
    // echo '<br>';    

    $sheetData = $spreadsheet->getSheetByName($sheetNames[$sheetIndex])->toArray();

    unset($sheetData[0]);
    
    foreach ($sheetData as $t) {
     // process element here;
        if($t[0]!="" && $t[1] != null){
            $info[$sheetIndex][$t[0]] = $t[1]!=null?$t[1]:0;
        }
        // echo $i."---".$t[0].",".$t[1]." <br>";
        // $i++;
    }
    // echo '<br>';
    // echo '<br>';
}
// echo "<pre>";
$response = array("info" => $info, "category" => $category, "provinces" => $sheetNames,"colors"=>$colors);
header('Content-Type: application/json');
echo json_encode($response);
?>
