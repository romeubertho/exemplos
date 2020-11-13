const httpMock = require("node-mocks-http");
const sinon = require("sinon");
const { expect } = require("chai");
const { EventEmitter } = require("events");
const UserControllerFactory = require("../../../src/Controller/UserController");
const UserServiceFactory = require("../../../src/Service/UserService");
const UserFixtures = require("../../fixtures/UserFixtures");
const { Error } = require("mongoose");

suite("UserController", () => {
  /** @var {UserService} userService */
  let userService;
  /** @var {UserCOntroller} userController */
  let userController;
  beforeEach(() => {
    userService = UserServiceFactory();
    userController = UserControllerFactory(userService);
  });
  afterEach(() => {
    sinon.restore();
  });
  suite("createUserAction", () => {
    const { defaultUser } = UserFixtures;
    test("if passing full body works correctly", (done) => {
      const { defaultRequestBody } = UserFixtures;
      const request = httpMock.createRequest({
        method: "POST",
        url: "/users",
        body: defaultRequestBody,
      });
      const response = httpMock.createResponse({ eventEmitter: EventEmitter });

      const createUserStub = sinon.stub(userService, "createUser");
      createUserStub.withArgs(defaultRequestBody).resolves(defaultUser);

      userController.createUserAction(request, response);

      response.on("end", () => {
        expect(response.statusCode).to.equal(200);

        const responseBody = {
          message: "User created",
          responseObject: { user: defaultUser },
        };
        expect(JSON.parse(response._getData())).to.eql(responseBody);
        console.log("a");
        sinon.assert.calledOnce(createUserStub);

        done();
      });
    });
    test("if throwing an error is caught correctly", (done) => {
      const error = new Error("Error trying to save user");
      const request = httpMock.createRequest({
        method: "POST",
        url: "/users",
        body: {},
      });
      const response = httpMock.createResponse({ eventEmitter: EventEmitter });

      const createUserStub = sinon.stub(userService, "createUser");
      createUserStub.withArgs({}).rejects(error);

      userController.createUserAction(request, response);

      response.on("end", () => {
        expect(response.statusCode).to.equal(500);
        const responseBody = {
          message: "Error creating user",
          error: error.message,
        };
        expect(JSON.parse(response._getData())).to.eql(responseBody);
        sinon.assert.calledOnce(createUserStub);
        done();
      });
    });
  });
});
