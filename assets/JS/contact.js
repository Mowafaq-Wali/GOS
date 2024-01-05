(function ($) {
    var name = $('.validate-input input[name="name"]');
    var email = $('.validate-input input[name="email"]');
    var subject = $('.validate-input input[name="subject"]');
    var message = $('.validate-input textarea[name="message"]');


    $('#form').on('submit', function () {
        var check = true;
        var language = localStorage.getItem('lang');

        if ($(name).val().trim() == '') {
            showValidate(name);
            if (language == "ar") {
                swal("خطاء ", "نرجو منك ادخال اسمك ", "error");
            } else {
                swal("Error ", "Please Enter Your Name ", "error");
            }
            check = false;
        }

        if ($(subject).val().trim() == '') {
            showValidate(subject);
            if (language == "ar") {
                swal("خطاء ", "نرجو منك ادخال موضوع الرساله ", "error");
            } else {
                swal("Error ", "Please Enter Your Mail Subject ", "error");
            }
            check = false;
        }

        if ($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            if (language == "ar") {
                swal("خطاء ", "نرجو منك ادخال الايميل الخاص بك  ", "error");
            } else {
                swal("Error ", "Please Enter Your Email ", "error");
            }
            check = false;
        }

        if ($(message).val().trim() == '') {
            showValidate(message);
            if (language == "ar") {
                swal("خطاء ", "نرجو منك ادخال الرساله ", "error");
            } else {
                swal("Error ", "Please Enter Your message ", "error");
            }
            check = false;
        }
        var emailValidation = $(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/);
        if (($(name).val().trim() == '') && ($(subject).val().trim() == '') && (emailValidation == null) && ($(message).val().trim() == '')) {
            if (language == "ar") {
                swal("خطاء ", "نرجو منك ان تملا حقول الادخال ", "error");
            } else {
                swal("Error ", "Please Fill Message Field ", "error");
            }
        }
        return check;
    });


    $('#form .input1').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }


    //sende contact email
    var form = document.getElementById('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        var name = document.getElementById("mail-sender-name");
        var email = document.getElementById("mail-sender-email");
        var mailSubject = document.getElementById("mail-subject");
        var mailMessage = document.getElementById("mail-message");

        var SenderEmail = email.value;
        var SenderName = name.value;
        var Subject = mailSubject.value;
        var Message = mailMessage.value;

        //console.log("the sender is " + name + "the Email is " + email + "The Subject is " + mailSubject + "the Message is " + mailMessage);

        var requestData = {
            SenderEmail,
            SenderName,
            Subject,
            Message
        };

        SendContactEmail(requestData);

        console.log(requestData.SenderEmail);
        console.log(requestData.SenderName);
        console.log(requestData.Subject);
        console.log(requestData.Message);
    })

    function SendContactEmail(contactModel) {
        $.ajax({
            type: "POST",
            url: "https://localhost:44331/api/Email/SendEmail",
            // crossOrigin: true,
            dataType: "JSON",
            contentType: "application/json",
            data: JSON.stringify(contactModel),
            success: function () {
                // console.log("The rquest response is : " + response);
                swal("Message Sent", "We Will Answer You At Short Time", "success");

                // senderName.value = "";
                // senderEmail.value = " ";
                // subject.value = "";
                // message.value = "";
            },
            error: function (xhr, status, error) {
                // swal("Error ", "There is An Error When Sending Email Try Again", "error");
                console.log("the Request is " + xhr.responseText + "the Status of Request is " + status + "the Error is " + error);
            }
        });
    }


})(jQuery);