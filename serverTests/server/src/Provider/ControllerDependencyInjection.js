const UserControllerFactory = require("../Controller/UserController");
const { UserService } = require("./ProvidersDepencyInjection");

const UserController = UserControllerFactory(UserService);

module.exports = {
  UserController,
};
