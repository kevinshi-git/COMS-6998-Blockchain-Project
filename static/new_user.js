function create_new_user(username,password){
    var return_data = null;
    var hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(password);
    var hashed_password = hashObj.getHash("HEX");
   
    let data_to_send = {"username": username,"password":hashed_password}  


    $.ajax({
    type: "POST",
    async: false,
    url: "/create_new_user",                
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
    $("#return_to_login_button").click(function() {
        location.href = document.location.origin;
    })

    $("#sign_up_button").click(function() {
        document.getElementById("log_in_error_text").innerHTML=""
        var username = $("#username_input").val();
        var password= $("#password_input").val();
        if (username=="" || password==""){
            document.getElementById("log_in_error_text").innerHTML="username and password must be at least 1 character"
        }
        else{
            if (create_new_user(username,password)){
                document.getElementById("username_input").innerHTML=""
                document.getElementById("password_input").innerHTML=""
                document.getElementById("log_in_error_text").innerHTML="Account Successfully Created";
            }
            else{
                document.getElementById("log_in_error_text").innerHTML="username already exists";
            }
        }
       
    })
    
});