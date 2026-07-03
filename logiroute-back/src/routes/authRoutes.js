const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");

router.post("/cadastro", AuthController.register);
router.post("/login", AuthController.login);

// implementar depois.
// router.get("/users", auth, AuthController.allUsers);
// router.get("/user/:id", auth, AuthController.getById);
// router.patch("/update-user/:id", auth, AuthController.updateUser);
// router.delete("/delete-user/:id", auth, AuthController.deleteUser);

module.exports = router;
