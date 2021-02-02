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
function UserService(userRepository) {
  return {
    /**
     * @param {UserObject} userInfo
     * @returns {Promise<Object>}
     */
    async createUser(userInfo) {
      logger.trace("Entered UserService::createUser", userInfo);
      return userRepository.createUser(userInfo).then((savedDoc) => {
        logger.debug("UserService::createUser saved user");
        return savedDoc;
      });
    },
  };
}

module.exports = UserService;
