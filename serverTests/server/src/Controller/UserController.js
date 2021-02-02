const BadRequestError = require("../Error/BadRequestError");
const logger = require("../Utils/Logger");
/**
 * @typedef {Object} UserController
 * @property {function(req: Request, res: Response)} createUserAction
 */

/**
 * @param {UserService} userService
 * @returns {UserController}
 */
function UserController(userService, userControllerUtils) {
  return {
    /**
     * @param {Request} req
     * @param {Response} res
     */
    createUserAction({ body }, res) {
      logger.trace("Entered UserController::createUserAction", body);
      const validationInfo = userControllerUtils.validateCreateUserBody(body);
      if (validationInfo.containErrors) {
        logger.debug(
          "UserController::createUserAction error validating request info"
        );
        throw new BadRequestError(
          `The following fields are required and must be not empty strings: ${validationInfo.fieldsWithErrors.join(
            ", "
          )}`
        );
      }
      return userService
        .createUser(body)
        .then((userInfo) => {
          logger.debug(
            "UserController::createUserAction successfully created",
            { email: userInfo.email }
          );
          return res.status(200).json({
            message: "User created",
            responseObject: { user: userInfo },
          });
        })
        .catch((error) => {
          logger.error("UserController::createUserAction error", {
            message: error.message,
          });
          return res
            .status(500)
            .json({ message: "Error creating user", error: error.message });
        });
    },
  };
}

module.exports = UserController;
