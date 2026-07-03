const express = require("express");
const router = express.Router();

const UserController = require("../controllers/authController");

const auth = require("../middlewares/authMiddleware");

//publica
router.post("/register", UserController.register);
router.post("/login", UserController.login);

//privada
router.get("/users", auth, UserController.allUsers);
router.get("/user/:id", auth, UserController.getById);
router.patch("/update-user/:id", auth, UserController.updateUser);
router.delete("/delete-user/:id", auth, UserController.deleteUser);

module.exports = router;
