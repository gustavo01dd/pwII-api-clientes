const clientes = require("../../data/clientes ")
const listarClientes = async (req, res) => {
    
    try{
        return res.status(200).json({
            sucesso: true, 
            total: clientes.lenght,
            dados: clientes,
        });

    } catch(error){
    return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao listar clientes",
        erro: error.mesage,

    });
   }
};

const buscarClientePorId = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID Invalido. Deve ser um numero inteiro",
            });
        }
        const cliente = clientes.find((c) => c.id === id);

        if(!clientes){
            return res.status(404).json({
                sucesso: false,
                mensagem: `Cliente com id ${id} não encontrado`,
            });
        }

        return res.status(200).json({
            sucesso: true,
            dados: clientes,
        });

    }catch(error){
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao buscar clientes por ID",
            erro: error.mesage,
        })
    }
}

module.exports = {
    listarClientesPorId
};