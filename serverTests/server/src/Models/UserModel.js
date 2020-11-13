/**
 * @typedef {Model} UserModel
 * @property {function(user: Object): UserModel} create
 */

/**
 * @typedef {Object} UserObject
 * @property {String} name
 * @property {String} lastname
 * @property {String} email
 * @property {String} gender
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @param {Mongoose} mongoose
 */
function UserModel(mongoose) {
  const userSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      lastname: { type: String, required: true },
      email: { type: String, required: true },
      gender: { type: String, required: true },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

  userSchema.statics.create = function create(user) {
    return new this(user);
  };

  return mongoose.model("user", userSchema);
}

module.exports = UserModel;
