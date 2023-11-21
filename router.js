const express = require('express');
const router = express.Router();
const { UserModel, PedidoModel, ReservaPedidoModel } = require('./model/schema');
const pool = require('./database/db');

router.get('/', (req, res) => {
    res.render('index'); 
});

router.get('/cardapios', (req, res) => {
    res.render('cardapios');
});

router.get('/gerenciamento', async (req, res) => {
    try {
        const reservas = await UserModel.find();
        const pedidos = await PedidoModel.find();
        const reservaPedidos = await ReservaPedidoModel.find();

        res.render('gerenciamento', {
            reservas,
            pedido: pedidos,
            reservaPedido: reservaPedidos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar dados para o gerenciamento' });
    }
});

router.get('/deletarMesa/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await UserModel.findByIdAndDelete(id);
        res.redirect('/gerenciamento');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar reserva de mesa' });
    }
});

router.get('/deletarReservaPedido/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await ReservaPedidoModel.findByIdAndDelete(id);
        res.redirect('/gerenciamento');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar reserva de pedido' });
    }
});

router.get('/deletarPedido/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await PedidoModel.findByIdAndDelete(id);
        res.redirect('/gerenciamento');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar pedido' });
    }
});

router.get('/editar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const reserva = await UserModel.findById(id);
        res.render('editar', { reserva });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar a reserva de mesa' });
    }
});

router.post('/atualizar-mesa/:id', async (req, res) => {
    const reservaId = req.params.id;
    const { numeroMesa, nome, telefone, email } = req.body;

    try {
        await UserModel.findByIdAndUpdate(reservaId, { numeroMesa, nome, telefone, email });
        res.redirect('/gerenciamento');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar reserva de mesa' });
    }
});

router.post('/atualizar-reservaPedido/:id', async (req, res) => {
    const reservaPedidoId = req.params.id;
    const { nome, telefone, endereco } = req.body;

    try {
        await ReservaPedidoModel.findByIdAndUpdate(reservaPedidoId, { nome, telefone, endereco });
        res.redirect('/gerenciamento');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar reserva de pedido' });
    }
});

router.post('/atualizarpedido/:id', async (req, res) => {
    const pedidoId = req.params.id;
    const { nome, quantidade, preco, total } = req.body;

    try {
        await PedidoModel.findByIdAndUpdate(pedidoId, { nome, quantidade, preco, total });
        res.redirect('/gerenciamento');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar pedido' });
    }
});


const crud = require('./controllers/crud');
router.post('/save', crud.save);
router.post('/saveReservaPedidos', crud.saveReservaPedidos);
router.post('/savePedidos', crud.savePedidos);

module.exports = router;
