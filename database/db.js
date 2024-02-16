const mongoose = require('mongoose');

const url = 'mongodb+srv://bancopizzaria:pizzaria@banco.khjjr51.mongodb.net/';
const dbName = 'crud';

mongoose.connect(url + dbName, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Erro de conexão: ' + error);
});

db.once('open', () => {
    console.log('Conectado ao MongoDB!');
});
