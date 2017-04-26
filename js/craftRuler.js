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
            var name = $("input#diameter").val();
            var email = $("input#height").val();

            $.ajax({
                url: "././craft/ruler.php",
                type: "POST",
                data: {
                    diameter: diameter,
                    height: height,
                },
                cache: false,
                success: function() {
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
                error: function() {
                    // Fail message
                    $('#measureSuccess').html("<div class='alert alert-danger'>");
                    $('#measureSuccess > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#measureSuccess > .alert-danger').append("<strong>Desculpe, alguma coisa deu errado. Tente novamente mais tarde.");
                    $('#measureSuccess > .alert-danger').append('</div>');
                    //clear all fields
                    $('#measureForm').trigger("reset");
                },
            });
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
