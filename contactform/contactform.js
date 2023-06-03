jQuery(document).ready(function ($) {
  "use strict";

  // Contact form submission
  $('form.contactForm').submit(function (e) {
    e.preventDefault(); // Prevent the default form submit behavior

    var f = $(this).find('.form-group');
    var ferror = false;
    var emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function () {
      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (!i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html(ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '').show('blind');
      }
    });

    f.children('textarea').each(function () {
      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html(ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '').show('blind');
      }
    });

    if (ferror) {
      return false;
    } else {
      var formData = new FormData(this);

      // Send email using EmailJS
      emailjs.send('service_9pzvdxj', 'template_07kk2pf', {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        reply_to: formData.get('email'),
        to_name: "Rajesh",
        subject: formData.get('subject'),
        message: formData.get('message')
      }).then(function (response) {
        // Email sent successfully
        $("#sendmessage").addClass("show");
        $("#errormessage").removeClass("show");
        $('.contactForm').find("input, textarea").val("");
      }, function (error) {
        // Error sending email
        $("#sendmessage").removeClass("show");
        $("#errormessage").addClass("show");
        $('#errormessage').html("An error occurred while sending the email.");
      });
      return false;
    }
  });
});
