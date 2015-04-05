$(function() {



    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
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

jQuery(document).ready(function ($) {
   // dom is ready
   console.log('Countdown');
    var target_date = new Date(2015, 05, 09, 20, 30, 0);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
var current_date = new Date(yyyy,mm,dd,hours,minutes,seconds);

//Create the countdown object
var count = new Countdown(target_date, current_date);
//Run the countdown
count.countdown(function(obj) {
//Do anything you want with the obj, which contains days, hours, minutes, seconds
//This will be called every one second as the countdown timer goes
// console.debug(obj);
//E.g. you might use jQuery to update the countdown ff
$('#days').html(obj.days);
$('#hours').html(obj.hours);
$('#minutes').html(obj.minutes);
$('#seconds').html(obj.seconds);
//This version will display all numbers with two digits
//$('#days').html((obj.days < 10 ? '0' : '') + obj.days);
//$('#hours').html((obj.hours < 10 ? '0' : '') + obj.hours);
//$('#minutes').html((obj.minutes < 10 ? '0' : '') + obj.minutes);
//$('#seconds').html((obj.seconds < 10 ? '0' : '') + obj.seconds);
});
});
/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
