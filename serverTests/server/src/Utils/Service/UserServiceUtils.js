const UserServiceUtils = {};

/**
 * @typedef
 * @param {Object} userInfo
 */

UserServiceUtils.validateCreateUserBody = (userInfo) => {
  const fieldsToValidate = ["name", "lastname", "email", "gender"];
  const fieldsWithErrors = fieldsToValidate.reduce(
    (errors, fieldToValidate) =>
      !userInfo[fieldToValidate] || userInfo[fieldToValidate] === ""
        ? [...errors, fieldToValidate]
        : errors,
    []
  );
  return { containErrors: fieldsWithErrors.length > 0, fieldsWithErrors };
};

module.exports = UserServiceUtils;
