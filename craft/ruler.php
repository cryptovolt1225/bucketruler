<?php
require('fpdf/fpdf.php');
// Check for empty fields
$diameter = 110;
$height = 10;
/*if(empty($_POST['diameter'])  		||
   empty($_POST['height']) 		||
   )
   {
	  echo "No arguments Provided!";
	  return false;
   }
	
$diameter = $_POST['diameter'];
$height = $_POST['height'];*/

$pdf = new FPDF( 'P', 'mm', 'A4' );

$pdf->AddPage();
$pdf->SetDisplayMode(real,'default');
$pdf->SetFillColor(0,0,0);
$pdf->SetFont('Arial','B',16);

$pdf->SetDrawColor(0,0,0);
$pdf->Line(20, 45, 210-$diameter, 45); // 20mm from each edge
$pdf->Line(50, 45, 210-$height, 45); // 50mm from each edge$pdf->Line(20,45,150,45);
//$pdf->Output("mypdf.pdf","S");
return $str = iconv('UTF-8', 'windows-1252', $pdf->Output("mypdf.pdf","I"));
//echo $pdf->Output("mypdf.pdf","D");
//echo $content;
?>
