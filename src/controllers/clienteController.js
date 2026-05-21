const clientes = require("../../data/clientes")
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

  //POST /cliente - cria um novo cliente 

  const adicionarCliente = async(req , res) => {
    try{
        const{ nome, telefone, endereco } = req.body;
        const novo_cliente = new Cliente(
            clientes.length + 1,
            nome,
            telefone,
            endereco
        );
        cliente.push(novo_cliente);
        return res.status(201).json({
            sucesso: true,
            mensagem: "Usuario adicionado com sucesso",
        })
    }catch(error){
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao adicionar cliente",
            erro: error.message
        })
    }
  }

  // PUT /clientes/:id - Atualiza um cliente pelo id:

  const atualizarCliente = async (req , res) => {
    try{
        const { id } = req.params;
        const { nome, telefone, endereco } = req

        const cliente = clientes.find((c) => c.id == id);

        if(!cliente){
            return res.status(404).json({
                sucesso: false,
                mensagem: `Cliente de id ${id} não encontrado`
            });
        }else{
            cliente.nome = nome;
            cliente.telefone = telefone;
            cliente.endereco = endereco;

            return res.status(200).json({
                sucesso: true,
                mensagem: "Cliente atualizado com sucesso"
            })
        }
    }catch(error){
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao atualizar cliente",
            erro: error.message
        })
        
    }
  }

  // DELETE /clientes/:id - remove um cliente pelo id:

   const deletarCliente = async (req , res) => {
    try{
        const { id } = req.params;
        const index = clientes.findIndex((c) => c.id == id);

        if(index === -1){
            return res.status(404).json({
                sucesso: false,
                mensagem: `Cliente de id ${id} não encontrado`
            })
        }else{
            clientes.splice(index, 1);
            return res.status(200).json({
                sucesso: true,
                mensagem: `Cliente com ${id} removido com sucesso`
            });
        }
    }catch(error){
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao remover cliente",
            erro: error.message
        })
    }
   }

module.exports = {
    listarClientes,
    buscarClientePorId,
    adicionarCliente,
    atualizarCliente,   
    deletarCliente,
};