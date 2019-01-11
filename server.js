const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=> {
    var now = new Date().toString();
    var log = (`${now}: ${req.method}  ${req.url} `);
    fs.appendFile('server.log',log + '\n',(err)=> {
        if(err){
            console.log('erro');
        }
    });
    next();
});

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();

});


app.get('/',(req,res)=> {
    // res.send('<h1>Hello Express!!</h1>');
    res.render('home.hbs',{
        pageTitle: 'HomePage',
        welcomeMessage: 'Welcome!',
    })  
});

app.get('/about',(req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
});
app.get('/bad',(req,res) => {
    res.send({
        erro: 'deu erro'
    })
});

app.listen(3003);
