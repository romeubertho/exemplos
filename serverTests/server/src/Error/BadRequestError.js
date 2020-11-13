/**
 * @typedef {Error} BadRequestError
 */

module.exports = class BadRequestError extends Error {
  /**
   * @param {String} message
   * @param {Object} additionalInfo
   */
  constructor(message, additionalInfo) {
    super(message);

    this.name = this.constructor.name;
    this.additionalInfo = additionalInfo || {};

    Error.captureStackTrace(this, this.constructor);
  }
};
