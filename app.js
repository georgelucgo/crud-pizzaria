const express = require('express');
const app = express();

app.set('view engine', 'html', 'ejs');
app.engine('html', require('ejs').renderFile)
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/', require('./router'));


app.listen(5000, ()=>{
    console.log('Servidor rodando em http://localhost:5000');
});
