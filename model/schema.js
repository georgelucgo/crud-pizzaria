const mongo = require("mongoose");
const { Schema } = mongo;

const userSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    numeroMesa:{
        type: Number,
        required: true
    }
});

const pedidoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});

const reservaPedidoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    }
});

const UserModel = mongo.model('ReservaMesa', userSchema);
const PedidoModel = mongo.model('Pedido', pedidoSchema);
const ReservaPedidoModel = mongo.model('ReservaPedido', reservaPedidoSchema);

module.exports = {
    UserModel,
    PedidoModel,
    ReservaPedidoModel
};
