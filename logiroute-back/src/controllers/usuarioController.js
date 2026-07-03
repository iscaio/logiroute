const prisma = require("../services/prismaClient");

// 1. LISTAR TODOS OS USUÁRIOS
exports.allUsers = async (req, res) => {
  try {
    const users = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        createdAt: true,
      },
    });

    res.status(200).json({ Message: "Lista de Usuários", users });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await prisma.usuario.findUnique({
      where: { id: id },
      select: {
        id: true,
        nome: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await prisma.usuario.update({
      where: { id: id },
      data: req.body,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await prisma.usuario.delete({
      where: { id: id },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
