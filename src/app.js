// src/app.js

const path = require("path");
const prisma = require("./config/prisma");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config({ path: path.resolve(__dirname, ".env") }); 

const express = require("express");
const clientesRoutes = require("./routes/clientesRoutes");

const app =  express();

const PORT = process.env.Port || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensagem: "API de clientes",
        versao: "1.0.0",
        endpoints: {
            listarTodos: "GET /clientes",
            buscarPorId: "GET /clientes/:id,"            
        }
    })
})


app.use("/clientes", clientesRoutes);

app.use((req, res) =>{
    res.status(404).json({
        sucesso: false, 
        mensagem: "Rota Não Encontrada",
    })
})

app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`);
    console.log (`\n 🚀 Servidor rodando em http://localhost:${PORT}`);
})

//Teardown de conexão
process.on("SIGINT", async () => {
    await prisma.$disconnect();
    console.log("conexão com o banco de dados encerrada");
    process.exit(0);
})
module.exports = app;