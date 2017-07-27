$(function() {

    $("#measureForm input,#measureForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events

        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();
            
            // get values from FORM
            var diameter = $("input#diameter").val();
            var height = $("input#height").val();
			var r = diameter/2.0;
			var pi = Math.PI;
			var margin = 0.635;
			var ruler_width = 5;
			var litersPerCm = pi * (r^2);
			var height2 = 0;

			if (height > 29.7) {
				height2 = height - 29.7;
			}

			var doc = new jsPDF({
			  unit: 'cm',
			  format: 'a4'
			});
			doc.setProperties({
			    title: 'Bucket Ruler',
			    author: 'bucketRuler',
			    keywords: 'generated, javascript, web 2.0, ajax',
			});

			//doc.line(0.635, 0.635, 0.635, height);
			//doc.line(0.635, 2, 0.635, 0.635);
			
			doc.rect(margin, margin, ruler_width, height - (margin*2)); // empty square
			var i = 0;
			while(i<=height-(margin*2))
			{
				if (i!=0){
					doc.line(ruler_width, (height-(margin*2))-i+margin, margin+ruler_width, (height-(margin*2))-i+margin);
					doc.text(ruler_width-margin*2,(height-(margin*2))-i+margin,((litersPerCm*i)/100).toFixed(2).toString()+'l');
				}
				i=i+1.5;
			}
			if (height2 > 0)
			{
				doc.rect(margin+7, margin, ruler_width, height2 - (margin*2)); // empty square
			}
			doc.save('ruler.pdf');
          /* $.ajax({
                url: "./craft/ruler.php",
                type: "POST",
                data: {
                    diameter: diameter,
                    height: height,
                },
                cache: false,
                success: function(data) {
                    // Enable button & show success message
                    $("#btnSubmit").attr("disabled", false);
                    $('#measureSuccess').html("<div class='alert alert-success'>");
                    $('#measureSuccess > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#measureSuccess > .alert-success')
                        .append("<strong>Sua régua foi criada. </strong>");
                    $('#measureSuccess > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#measureForm').trigger("reset");
                },
                error: function(data) {
                    // Fail message
                    $('#measureSuccess').html("<div class='alert alert-danger'>");
                    $('#measureSuccess > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#measureSuccess > .alert-danger').append("<strong>Desculpe, alguma coisa deu errado. Tente novamente mais tarde.");
                    $('#measureSuccess > .alert-danger').append('</div>');
                    //clear all fields
                    $('#measureForm').trigger("reset");
                },
            }); */
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#diameter').focus(function() {
    $('#measureSuccess').html('');
});
function dottedLine(doc, xFrom, yFrom, xTo, yTo, segmentLength)
{
    // Calculate line length (c)
    var a = Math.abs(xTo - xFrom);
    var b = Math.abs(yTo - yFrom);
    var c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));

    // Make sure we have an odd number of line segments (drawn or blank)
    // to fit it nicely
    var fractions = c / segmentLength;
    var adjustedSegmentLength = (Math.floor(fractions) % 2 === 0) ? (c / Math.ceil(fractions)) : (c / Math.floor(fractions));

    // Calculate x, y deltas per segment
    var deltaX = adjustedSegmentLength * (a / c);
    var deltaY = adjustedSegmentLength * (b / c);

    var curX = xFrom, curY = yFrom;
    while (curX <= xTo && curY <= yTo)
    {
        doc.line(curX, curY, curX + deltaX, curY + deltaY);
        curX += 2*deltaX;
        curY += 2*deltaY;
    }
}

