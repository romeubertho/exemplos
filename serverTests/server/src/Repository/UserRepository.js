const logger = require("../Utils/Logger");
const CommunicationError = require("../Error/CommunicationError");

/**
 * @typedef {Object} UserRepository
 * @property {function(userInfo: Object): Promise<Object>} createUser
 */

/**
 * @param {UserModel} userModel
 * @constructor
 */
function UserRepository(userModel) {
  return {
    /**
     * @param {Object} userInfo
     * @returns {Promise<Object>}
     */
    createUser(userInfo) {
      logger.trace("Entered UserRepository::createUser", userInfo);
      try {
        const userDoc = userModel.create(userInfo);
        return userDoc.save().then((savedDoc) => {
          logger.debug("UserRepository::createUser saved successfully");
          return savedDoc;
        });
      } catch (error) {
        logger.error(
          "UserRepository::createUser error trying to save user doc.",
          error
        );
        throw new CommunicationError(
          `Error trying to save card doc. Error: ${error}`
        );
      }
    },
  };
}

module.exports = UserRepository;
