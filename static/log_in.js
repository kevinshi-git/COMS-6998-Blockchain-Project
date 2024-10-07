function check_login(username,password){
    let data_to_send = {"username": username,"password":password}  
    var return_data = null;

    $.ajax({
    type: "POST",
    async: false,
    url: "/verify_login",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(data_to_send),
    success: function(result){
        return_data = result["data"];
    },
    error: function(request, status, error){
        console.log("Error");
        console.log(request)
        console.log(status)
        console.log(error)
    }
    });
    console.log("returned data",return_data);
    return return_data;
}

$(document).ready(function () {
   

    $("#log_in_button").click(function() {
        var username = $("#username_input").val();
        var password= $("#password_input").val();
        if (check_login(username,password)){
            console.log("good")
            location.href = document.location.origin + "/user/" + username;
        }
        else{
            document.getElementById("log_in_error_text").innerHTML="wrong username or password";

        }

    })
    
});