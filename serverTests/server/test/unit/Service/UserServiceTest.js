const sinon = require("sinon");
const { expect } = require("chai");

const UserServiceFactory = require("../../../src/Service/UserService");
const UserRepositoryFactory = require("../../../src/Repository/UserRepository");

const UserFixtures = require("../../fixtures/UserFixtures");

suite("UserSerive", () => {
  /** @var {UserService}  */
  let userService;
  let userRepository;
  let serviceUtilsStub;
  beforeEach(() => {
    serviceUtilsStub = { validateCreateUserBody: sinon.stub() };
    userRepository = UserRepositoryFactory();
    userService = UserServiceFactory(userRepository, serviceUtilsStub);
  });

  afterEach(() => {
    sinon.restore();
  });
  suite("createUser", () => {
    const { defaultRequestBody, defaultUser } = UserFixtures;
    test("if receiving body with all info being different from empty string, create User", (done) => {
      const createUserStub = sinon.stub(userRepository, "createUser");

      serviceUtilsStub.validateCreateUserBody
        .withArgs(defaultRequestBody)
        .returns({ containErrors: false });

      createUserStub.withArgs(defaultRequestBody).resolves(defaultUser);

      userService.createUser(defaultRequestBody).then((savedDoc) => {
        expect(savedDoc).to.eql(defaultUser);
        sinon.assert.calledOnce(serviceUtilsStub.validateCreateUserBody);
        sinon.assert.calledOnce(createUserStub);
        done();
      });
    });
  });
});
