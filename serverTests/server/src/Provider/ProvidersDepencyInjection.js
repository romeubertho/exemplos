const mongoose = require("mongoose");

const UserRepositoryFactory = require("../Repository/UserRepository");
const UserServiceFactory = require("../Service/UserService");
const userServiceUtils = require("../Utils/Service/UserServiceUtils");

const UserModel = require("../Models/UserModel")(mongoose);

const UserRepository = UserRepositoryFactory(UserModel);
const UserService = UserServiceFactory(UserRepository, userServiceUtils);

module.exports = {
  UserService,
};
