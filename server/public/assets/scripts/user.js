$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "/user",
        success: function(data){
            console.log(data);
            $("#welcome").text("Logged In "
                +  data.firstName );
        }
    });
});