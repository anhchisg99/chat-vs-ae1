require('dotenv').config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var shortid = require('shortid');
var auth = require('./controllers/auth.controller');
var  db = require('./db');
// var mongoose = require('mongoose');
var user = require('./models/user.model');


const PORT = 3000 || process.env.PORT;

// mongoose.connect('mongodb://localhost:27017/express-demo');

app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views", "./views");
app.use(cookieParser());

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(PORT);


// mang
var arr = [];

io.on("connection",function(socket){
    console.log("co nguoi ket noi " + socket.id);
    socket.on("disconnect",function(){
        console.log(socket.id + " ngat ket noi");

    });
    
    socket.on("client-nhap",function(data){
        
        arr.push(data); 
        socket.userName = data;
        io.sockets.emit("client-nhap-res",arr);

        socket.on("logout",function(){
            arr.splice(arr.indexOf(socket.userName),1);
        
            socket.broadcast.emit('client-nhap-res',arr);
        

    });
    socket.on('text',function(data){
        socket.broadcast.emit('text-res',{un:socket.userName,nd:data});
        
        socket.emit('text-res1',{un:socket.userName,nd:data});

    });
    
        

   
});
    
    


  // dang xuat 
  app.get('/dangxuat',function(req,res){
    res.clearCookie('userId');
    
    
    res.redirect('/');
});
  

app.get('/dangky',function(req,res){
    res.render("dangky")});
app.post('/dangky',function(req,res){
    // append id 
    req.body.id = shortid.generate();
    
    // Add a post
db.get('user').push(req.body).write();

    res.redirect('/');
});

app.post('/',function(req,res){
    var x = req.body;
    var y = req.body.email;
    var z = req.body.pass;
    var errors = [];


    

  var h =   db.get('user')
  .find({ name : y })
  .value()



console.log(h);


  if (typeof h == 'undefined'){
    console.log("Biến variable không được định nghĩa");
    return;
}
  
   var o = h.name;
   var i = h.pass;

//   console.log(i);
//   console.log(y);
//   console.log(z);

  if(typeof h == 'undefined'){
      console.log("bien chua dinh nghia");
      res.redirect('/');

      return;
  }else{
      console.log("tai khoan dung");
      if(i == z){
          console.log("pass dung");
          
          res.cookie('userId',h.id);
          
          
          
          res.redirect('/dangnhap');

      }else{
          console.log("pass sai");
          
         
         
        
      }

  }
 
});
app.get('/chovui',function(req,res){
    res.send("dangnhap")});
  
  });
app.get('/cookie',function(req,res){
    res.cookie('user-id',123456 );
    console.log(shortid.generate());
    
    console.log(req.cookies);
   
    
    res.send("trangchu")});

app.get('/',function(req,res){
  res.render("trangchu")});
app.get('/dangnhap',auth.authz,function(req,res){
  res.render("dangnhap")});

