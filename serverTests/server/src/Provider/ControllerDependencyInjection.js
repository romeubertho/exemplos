const UserControllerFactory = require("../Controller/UserController");
const { UserService } = require("./ProvidersDepencyInjection");
const userControllerUtils = require("../Utils/Service/UserControllerUtils");

const UserController = UserControllerFactory(UserService, userControllerUtils);

module.exports = {
  UserController,
};
