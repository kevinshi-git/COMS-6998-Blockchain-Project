function fill_page(){
    var image="https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg";
    document.getElementById("user_image").src=image;
    $("#username_text").html(username+" receipts history");

}

$(document).ready(function () {
    console.log(username);
    fill_page();
});