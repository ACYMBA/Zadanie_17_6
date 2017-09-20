var express = require('express');
var bodyParser = require('body-parser')
var app = express();

var password;

app.set('view engine', 'pug');
app.set('views','./views');



app.use(bodyParser.urlencoded({ extended: true }));

app.use('/store', function(req, res, next){
    console.log('Jestem pośrednikiem przy żądaniu do /store');
    next();
});


app.get('/', function (req, res) {
    res.send('Hello world!');
});

app.get('/store', function (req, res) {
    res.send('To jest sklep');
});

app.get('/first-view', function(req, res){
    res.render('first-view');
});

app.get('/auth/google', function(req, res) {
  res.render('first-view.pug',{header: 'Logowanie'});  

});

app.post('/user', function(req, res) {
    password = req.body.password;
   if (password.length >= 8 ) {
     res.render('userform.pug', {
      header: ', jesteś zalogowany!', 
         username: req.body.username
      }); 
     } else {
       res.render('badpass.pug');
     }

});

app.listen(3000);
app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
});