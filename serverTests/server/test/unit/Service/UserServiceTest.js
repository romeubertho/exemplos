const sinon = require("sinon");
const { expect } = require("chai");

const UserServiceFactory = require("../../../src/Service/UserService");
const UserRepositoryFactory = require("../../../src/Repository/UserRepository");

const UserFixtures = require("../../fixtures/UserFixtures");

suite("UserSerive", () => {
  /** @var {UserService}  */
  let userService;
  let userRepository;
  beforeEach(() => {
    userRepository = UserRepositoryFactory();
    userService = UserServiceFactory(userRepository);
  });

  afterEach(() => {
    sinon.restore();
  });
  suite("createUser", () => {
    const { defaultRequestBody, defaultUser } = UserFixtures;
    test("if receiving body with all info being different from empty string, create User", (done) => {
      const createUserStub = sinon.stub(userRepository, "createUser");

      createUserStub.withArgs(defaultRequestBody).resolves(defaultUser);

      userService.createUser(defaultRequestBody).then((savedDoc) => {
        expect(savedDoc).to.eql(defaultUser);
        sinon.assert.calledOnce(createUserStub);
        done();
      });
    });
  });
  suite("updateUser", () => {
    const { defaultRequestBody, updatedUser } = UserFixtures;
    test("if receiving body with all info being different from empty string, update User", (done) => {
      const updateUserStub = sinon.stub(userRepository, "updateUser");

      updateUserStub.withArgs(defaultRequestBody).resolves(updatedUser);

      userService.updateUser(defaultRequestBody).then((updatedDoc) => {
        expect(updatedDoc).to.eql(updatedUser);
        sinon.assert.calledOnce(updateUserStub);
        done();
      });
    });
  });
});
