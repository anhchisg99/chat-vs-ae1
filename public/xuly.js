
var socket = io("http://localhost:3000");


socket.on('client-nhap-res',function(data){
    $('.fa-comments').html("");
    data.forEach(function(item,index){
        $('.fa-comments').append('<br>'+item + '<br>');

    });

});
socket.on('text-res',function(data){
    $('.nhap-chat').append('<div class="d-flex flex-row  mb-3">'+'<p class="p-2 bg-secondary text-white" >' +data.un +" "+ ":" + " "+ data.nd + '<br>'+'</p>'+'</div>');

});
socket.on('text-res1',function(data){
    $('.nhap-chat').append('<div class="d-flex flex-row-reverse  mb-3">'+'<p class="p-2 bg-primary text-white" >' +data.un +" "+ ":" + " "+ data.nd + '<br>'+'</p>'+'</div>');

});







 
        $(document).ready(function(){
  $('.type_msg').hide();
  $(".but1").click(function(){
    $('.col-sm-9 .bg-white').hide(1000);
    $('.type_msg').show(1000);

  });
  
  
  $('.but1').click(function(){
      socket.emit('client-dnhap');


  });
  
  $('.but1').click(function(){
      var x =$('#name').val();
      $('.iconh').append(" " + x);
      socket.emit('client-nhap',x);

  });
  $('.butdx').click(function(){
      socket.emit('logout');

  });
  $('.but2').click(function(){
    socket.emit('text',$("#comment").val() );
    $(".nhap-chat").stop().animate({ scrollTop: $(".nhap-chat")[0].scrollHeight}, 1000);
    



});
$('.but2').click(function(){
  var x=  $('#comment').val();
  x = html("");

});



  
  
 



  


  






// $("#nv1").click(function(){
//     alert("Value: " + $("#test").val());
//     $('#chan').text($("#test").val());
//   });

  


  
//   $('#chan').text('chan');
  
        });




  // them vao icon ngoi nha
//   var iconhouse = $('#email').val();
//   $('.form-chat .btn-primary').click(function(){
//     $('.iconh').text(iconhouse);
//   });


        