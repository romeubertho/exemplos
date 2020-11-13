const BadRequestError = require("../Error/BadRequestError");
const logger = require("../Utils/Logger");
/**
 * @typedef {Object} UserService
 * @property {function(userInfo: Object): Promise<Object>} createUser
 */

/**
 *
 * @param {UserRepository} userRepository
 * @returns {UserService}
 */
function UserService(userRepository, userServiceUtils) {
  return {
    /**
     * @param {UserObject} userInfo
     * @returns {Promise<Object>}
     */
    async createUser(userInfo) {
      logger.trace("Entered UserService::createUser", userInfo);
      const validationInfo = userServiceUtils.validateCreateUserBody(userInfo);
      if (!validationInfo.containErrors) {
        return userRepository.createUser(userInfo).then((savedDoc) => {
          logger.debug("UserService::createUser saved user");
          return savedDoc;
        });
      }
      logger.debug("UserService::createUser error validating user info");
      throw BadRequestError(
        `The following fields are required and must be not empty strings: ${validationInfo.fieldsWithErrors.join(
          ", "
        )}`
      );
    },
  };
}

module.exports = UserService;
