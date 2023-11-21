const db = require('../database/db');
const { ObjectId } = require('mongodb');
const { UserModel, PedidoModel, ReservaPedidoModel } = require('../model/schema');

exports.save = async (req, res) => {
    const numeroMesa = req.body.numeroMesa;
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const email = req.body.email;

    try {
        const newUser = new UserModel({ nome, telefone, email, numeroMesa });
        await newUser.save();
        res.render('index');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao salvar a reserva de mesa' });
    }

    console.log(nome + ' ' + telefone + ' ' + numeroMesa + ' ' + email);
};

exports.saveReservaPedidos = async (req, res) => {
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const endereco = req.body.endereco;

    try {
        const newReservaPedido = new ReservaPedidoModel({ nome, telefone, endereco });
        await newReservaPedido.save();
        res.render('index');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao salvar a reserva de pedido' });
    }

    console.log(nome + ' ' + telefone + ' ' + endereco);
};

exports.savePedidos = async (req, res) => {
    const dadosPedidos = req.body;

    try {
        const newPedidos = await PedidoModel.insertMany(dadosPedidos);
        res.status(200).json({ message: 'Pedidos salvos com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao salvar pedidos' });
    }

    console.log(dadosPedidos);
};
