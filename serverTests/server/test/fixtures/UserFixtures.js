const UserFixtures = {};

UserFixtures.defaultRequestBody = {
  name: "Jeffzitos",
  lastname: "Tusqueira",
  email: "jeffzitos@tusca.com.br",
  gender: "descubra",
};

UserFixtures.defaultUser = {
  name: "Jeffzitos",
  lastname: "Tusqueira",
  email: "jeffzitos@tusca.com.br",
  gender: "descubra",
  createdAt: "2018-10-10T00:00:00.000Z",
  updatedAt: "2018-10-10T00:00:00.000Z",
};

UserFixtures.requestBodyWithoutNameField = {
  lastname: "Tusqueira",
  email: "jeffzitos@tusca.com.br",
  gender: "descubra",
};

UserFixtures.requestBodyWithEmailAsEmptyString = {
  name: "Jeffzitos",
  lastname: "Tusqueira",
  email: "",
  gender: "descubra",
};

module.exports = UserFixtures;
