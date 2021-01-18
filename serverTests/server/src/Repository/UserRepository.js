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
          `Error: ${error.message}`
        );
        throw new CommunicationError(`Error trying to save user doc. ${error}`);
      }
    },
    updateUser(userInfo) {
      logger.trace("Entered UserRepository::updateUser", userInfo);
      try {
        return userModel
          .update(userInfo)
          .then((updatedDoc) => {
            logger.debug("UserRepository::updateUser updated successfully");
            return updatedDoc;
          });
      } catch (error) {
        logger.error(
          "UserRepository::updateUser error trying to update user doc.",
          `Error: ${error.message}`
        );
        throw new CommunicationError(
          `Error trying to update user doc. ${error}`
        );
      }
    },
  };
}

module.exports = UserRepository;
