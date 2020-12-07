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

  let controllerUtilsStub;
  beforeEach(() => {
    userService = UserServiceFactory();
    controllerUtilsStub = { validateCreateUserBody: sinon.stub() };
    userController = UserControllerFactory(userService, controllerUtilsStub);
  });
  afterEach(() => {
    sinon.restore();
  });
  suite("createUserAction", () => {
    const { defaultUser, defaultRequestBody } = UserFixtures;
    test("if passing full body works correctly", (done) => {
      const request = httpMock.createRequest({
        method: "POST",
        url: "/users",
        body: defaultRequestBody,
      });
      const response = httpMock.createResponse({ eventEmitter: EventEmitter });

      const createUserStub = sinon.stub(userService, "createUser");
      createUserStub.withArgs(defaultRequestBody).resolves(defaultUser);

      controllerUtilsStub.validateCreateUserBody
        .withArgs(defaultRequestBody)
        .returns({ containErrors: false });

      userController.createUserAction(request, response);

      response.on("end", () => {
        expect(response.statusCode).to.equal(200);

        const responseBody = {
          message: "User created",
          responseObject: { user: defaultUser },
        };
        expect(JSON.parse(response._getData())).to.eql(responseBody);
        sinon.assert.calledOnce(controllerUtilsStub.validateCreateUserBody);
        sinon.assert.calledOnce(createUserStub);

        done();
      });
    });
    test("if userService throwing an error is caught correctly", (done) => {
      const error = new Error("Error trying to save user");
      const request = httpMock.createRequest({
        method: "POST",
        url: "/users",
        body: {},
      });
      const response = httpMock.createResponse({ eventEmitter: EventEmitter });

      const createUserStub = sinon.stub(userService, "createUser");
      createUserStub.withArgs({}).rejects(error);

      controllerUtilsStub.validateCreateUserBody
        .withArgs({})
        .returns({ containErrors: false });

      userController.createUserAction(request, response);

      response.on("end", () => {
        expect(response.statusCode).to.equal(500);
        const responseBody = {
          message: "Error creating user",
          error: error.message,
        };
        expect(JSON.parse(response._getData())).to.eql(responseBody);
        sinon.assert.calledOnce(controllerUtilsStub.validateCreateUserBody);
        sinon.assert.calledOnce(createUserStub);
        done();
      });
    });
  });
});
