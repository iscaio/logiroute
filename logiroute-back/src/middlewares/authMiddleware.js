const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso Negado: Token não fornecido." });
  }

  try {
    const tokenLimpo = token.replace("Bearer ", "");

    const decoded = jwt.verify(tokenLimpo, JWT_SECRET);
    req.userId = decoded.id;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Acesso Negado: Token inválido ou expirado." });
  }
};

module.exports = auth;
