$(document).ready(function () {
    $("#password").on('input', function () {
        var password = $("#password").val();
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (password.match(passwordRegex)) {
            $("#password").css("border", "2px solid green");
            $("#passwordError").text("");
        } else {
            $("#password").css("border", "2px solid red");
            $("#passwordError").text("Password must contain at least 8 characters, including uppercase, lowercase letters and numbers.");
        }
    });
    $("#passwordr").on('input', function () {
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();
        if (password == confirmPassword) {
            $(this).css("border", "2px solid green");
        } else {
            $("#confirmPassword").css("border", "2px solid red");
            console.log()
        }
    });
});