const express = require("express");
const { UserController } = require("../Provider/ControllerDependencyInjection");
const router = express.Router();

router.post("/users", UserController.createUserAction);

module.exports = router;
