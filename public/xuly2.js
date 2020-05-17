var socket = io("http://localhost:3000");


$(document).ready(function(){
    
    $('.biet').click(function(){
        $('#chan').text($('#e11').val());
    });

    $('.butsb').click(function(){
        $('#chan').text($('#e1').val());
    });
    
    // $(".biet").click(function(){
    //     alert("Value: " + $("#e11").val());
    //   });
});