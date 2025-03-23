$(document).ready(function () {
    $("#loginForm").submit(function (e) {
        e.preventDefault();

        let userData = {
            username: $("#username").val(),
            password: $("#password").val()
        };

        $.ajax({
            url: "http://localhost/EmployeeApp/api/login.php",
            type: "POST",
            data: JSON.stringify(userData),
            contentType: "application/json",
            success: function (response) {
                let res = JSON.parse(response);
                if (res.success) {
                    localStorage.setItem("user", JSON.stringify(res.user));
                    window.location.href = "index.html";
                } else {
                    $("#errorMessage").text("Invalid username or password.");
                }
            },
            error: function () {
                $("#errorMessage").text("Server error. Try again.");
            }
        });
    });
});
