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
});
