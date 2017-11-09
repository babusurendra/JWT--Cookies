var app = require('express')();
var express = require('express');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
//app.use(express.cookieParser('S3CRE7'));
app.use(session({
    key: 'app.sess',
    secret: 'SEKR37'
  }));

// app.use(function(req,res){
//     console.log("this is middleware");
// })
var jws = require('express-jwt-session');
var secret = 'mysecret';
var isAuthenticated = jws.isAuthenticated(secret);
var session = require("express-session");
var token = jws.signToken({email:'test@test.com', name:'test'}, secret, 150);
user = {
    "name":"Surendra"
}
app.get('/login',function(req,res){
    var token = jwt.sign(user, 'secret');
   // app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
     res.cookie('auth',token);
     req.session.token =token;
     
    // req.session['primary skill'] = 'Dancing';
     res.json({Token:token});
});

// app.use(session({
//     name: 'server-session-cookie-id',
//     secret: 'my express secret',
//     saveUninitialized: true,
//     resave: true,
//     store: new FileStore()
//   }));

app.use(function(req,res,next){
    // res.redirect('/');
    //var token = req.cookies.auth;
   // console.log("token stored in session is "+ req.session.token);
    //console.log("token in cookie"+ token);
  //  console.log(req.cookies);
      // decode token
      let token = req.session.token;
      if (token) {
    
        jwt.verify(token, 'secret', function(err, token_data) {
          if (err) {
             return res.status(403).send('Error');
          } else {
            req.user_data = token_data;
            next();
          }
        });
    
      } else {
        return res.status(403).send('No token');
      }
      //res.clearCookie("auth");
      //res.redirect('/login');
});
app.use(function(req,res,next){
    //token = req.cookies.auth;
    //console.log("token after deleting"+ token);
    next();
})
app.get('/protected',function(req,res){
    res.send("we are in protected");
})
app.get('/logout',function(req,res){
    delete req.session.token;
    res.send("Your session deleted");
});
// $window.sessionStorage.accessToken = response.body.access_token;
// app.use(function(req, res, next) {
//     var session_id = req.header("x-session-token");
//     req.session = session.getById(session_id); //like this
//     next(); //here session is loaded
// });
// console.log(session);
//signToken a user and return token 
//150 is the  access seconds of session 
// app.get('/setAuth', function(req, res) {
// 	var token = jws.signToken({email:'test@test.com', name:'test'}, secret, 150);
//     res.set({
//         'content-type': 'application/json',
//         'content-length': '100',
//         'token': {'Authorization': 'Bearer ' + token}
//      });
//      console.log(req.Bearer);
//     res.json({token : token});
// });
// app.get('/getWithAuth', isAuthenticated, function(req, res) {
//     //res.send(req.user);
//     console.log(req);
//     res.send("done");

// });


// //{'Authorization': 'Bearer ' + token}
// //auth token and set req.user  or  return 401 code
// //app.get('/getWithAuth', isAuthenticated, function(req, res) {
// //	res.send(req.user);
// //});



// // var requestProxy = require('express-request-proxy');
// // app.get('/login',function(req,res){
// //     var user ={
// //         username:'Surendra',
// //         password:'Surendra'
// //     }
// //     var Token = jwt.sign(user,'secrete');
// //     restoken ={
// //         Token:Token
// //     }
// //     process.env.SOMEAPI_SECRET_KEY = Token;
// //     //console.log(process.env.SOMEAPI_SECRET_KEY);
// //     //req.rawHeaders.token = Token;
// //     //console.log(req);
// //     req.headers['mytoken'] = restoken

// //    // res.setHeader('Secrete', restoken);
// //     res.json(restoken);
// // });

// // app.post('/protected',requestProxy({
// //     cache: redis.createClient(),
// //     cacheMaxAge: 60,
// //     url: "https://someapi.com/api/:resource/:id",
// //     query: {
// //       secret_key: process.env.SOMEAPI_SECRET_KEY
// //     },
// //     headers: {
// //         'X-Custom-Header': process.env.SOMEAPI_CUSTOM_HEADER
// //     }}),function(req,res,next){

// // });
// // function ensuretoken(){

// // }
app.listen(4000,function(error,data){
    if(error){
        console.log("Error while starting server");
    }    
    else{
        console.log("Server Started")
    }
});