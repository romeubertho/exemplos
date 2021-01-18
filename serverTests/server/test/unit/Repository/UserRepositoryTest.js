const sinon = require("sinon");
const { assert, expect } = require("chai");
const UserFixtures = require("../../fixtures/UserFixtures");

const UserRepository = require("../../../src/Repository/UserRepository");
const CommunicationError = require("../../../src/Error/CommunicationError");

suite("UserRepository", () => {
  /** @var {UserRepository} */
  let userRepository;
  let userModelMock;
  beforeEach(() => {
    userModelMock = {
      create: sinon.stub(),
      update: sinon.stub(),
    };
    userRepository = UserRepository(userModelMock);
  });

  afterEach(() => {
    sinon.restore();
  });

  suite("createUser", () => {
    const { defaultUser } = UserFixtures;
    test("if passing a userInfo tries to insert and save on mongo", (done) => {
      const userDocMock = {
        save: sinon.stub(),
      };
      userModelMock.create.withArgs(defaultUser).returns(userDocMock);

      userDocMock.save.resolves(defaultUser);

      userRepository.createUser(defaultUser).then((response) => {
        sinon.assert.calledOnce(userModelMock.create);
        sinon.assert.calledOnce(userDocMock.save);
        expect(response).to.eql(defaultUser);
        done();
      });
    });
    test(
      "if some exception is thrown inside the function they fall into catch and".concat(
        " throw a CommunicationError"
      ),
      () => {
        const userDocMock = {
          save: sinon.stub(),
        };
        userModelMock.create.withArgs(defaultUser).returns(userDocMock);

        const errorMock = new Error("Mama tells me im ok");
        userDocMock.save.throws(errorMock);

        assert.throws(
          () => userRepository.createUser(defaultUser),
          CommunicationError,
          "Error trying to save user doc. Error: Mama tells me im ok"
        );
        sinon.assert.calledOnce(userModelMock.create);
        sinon.assert.calledOnce(userDocMock.save);
      }
    );
  });
  suite("updateUser", () => {
    const { defaultUser, updatedUser } = UserFixtures;
    test("if passing a userInfo tries to update on mongo", (done) => {
      userModelMock.update.withArgs(defaultUser).resolves(updatedUser);

      userRepository.updateUser(defaultUser).then((response) => {
        sinon.assert.calledOnce(userModelMock.update);
        expect(response).to.eql(updatedUser);
        done();
      });
    });
    test(
      "if some exception is thrown inside the function they fall into catch and".concat(
        " throw a CommunicationError"
      ),
      () => {
        const errorMock = new Error("Mama tells me im ok");
        userModelMock.update.withArgs(defaultUser).throws(errorMock);

        assert.throws(
          () => userRepository.updateUser(defaultUser),
          CommunicationError,
          "Error trying to update user doc. Error: Mama tells me im ok"
        );
        sinon.assert.calledOnce(userModelMock.update);
      }
    );
  });
});
