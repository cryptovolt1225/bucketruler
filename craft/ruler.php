<?php
require('fpdf/fpdf.php');
// Check for empty fields
if(empty($_POST['diameter'])  		||
   empty($_POST['height']) 		||
   )
   {
	  echo "No arguments Provided!";
	  return false;
   }
	
$diameter = strip_tags(htmlspecialchars($_POST['diamter']));
$height = strip_tags(htmlspecialchars($_POST['height']));
	


$pdf = new FPDF( 'P', 'mm', 'A4' );

$pdf->AddPage();
$pdf->SetDisplayMode(real,'default');
$pdf->SetFillColor(0,0,0);
$pdf->SetFont('Arial','B',16);

$pdf->Image('logo.jpg',20,10,50,33.3);

$pdf->SetDrawColor(188,188,188);
$pdf->Line(20, 45, 210-$diameter, 45); // 20mm from each edge
$pdf->Line(50, 45, 210-$height, 45); // 50mm from each edge$pdf->Line(20,45,150,45);

return true;			
?>
