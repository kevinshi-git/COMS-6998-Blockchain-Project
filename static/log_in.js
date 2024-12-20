function create_new_user(username,password){
    var hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(password);
    var hashed_password = hashObj.getHash("HEX");
   
    let data_to_send = {"username": username,"password":hashed_password}  
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

    $("#new_user_button").click(function() {
        location.href = document.location.origin+"/new_user"
    })

    $("#log_in_button").click(function() {
        var username = $("#username_input").val();
        var password= $("#password_input").val();
        if (create_new_user(username,password)){
            console.log("good")
            location.href = document.location.origin + "/user/" + username;
        }
        else{
            document.getElementById("log_in_error_text").innerHTML="wrong username or password";
        }
    })
    
});