// Importando o express
import express, { request, response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Criando o Servidor
const app = express();
app.use(express.json());

// Criar usuário
app.post("/usuarios", async (request, response) => {
  try {
    const usuario = await prisma.usuario.create({
      data: {
        email: request.body.email,
        name: request.body.name,
        age: request.body.age,
      },
    });

    response.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: "Erro ao criar usuário",
      error,
    });
  }
});

//Editando um usuario
app.put("/usuarios/:id", async (request, response) => {
  try {
    const usuario = await prisma.usuario.update({
      where: {
        id: request.params.id
      },
      data: {
        email: request.body.email,
        name: request.body.name,
        age: request.body.age,
      },
    });

    response.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: "Erro ao atualiza usuário",
      error,
    });
  }
});

// Listar usuários
app.get("/usuarios", async (request, response) => {
  try {
    const usuarios = await prisma.usuario.findMany();

    response.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: "Erro ao buscar usuários",
      error,
    });
  }
});

//Deletando um usuario 
app.delete("/usuarios/:id", async (request, response) => {    
    await prisma.usuario.delete({
        where: {
            id: request.params.id
        }
    })
    response.status(200).json({mensage: 'Usuario deletado com sucesso!'})
})

app.listen(3333, () => {
  console.log("Servidor rodando em http://localhost:3333");
});