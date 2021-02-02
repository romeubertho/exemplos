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

UserFixtures.testRequestBody = {
  name: "Romeu",
  lastname: "Berthao",
  email: "romeu@usp.br",
  gender: "masc",
};

UserFixtures.testUser = {
  name: "Romeu",
  lastname: "Berthao",
  email: "romeu@usp.br",
  gender: "masc",
  createdAt: "2018-10-10T00:00:00.000Z",
  updatedAt: "2018-10-10T00:00:00.000Z",
};

UserFixtures.nullEmailRequestBody = {
  name: "Romeu",
  lastname: "Berthao",
  gender: "masc",
};

UserFixtures.nullEmailUser = {
  name: "Romeu",
  lastname: "Berthao",
  gender: "masc",
  createdAt: "2018-10-10T00:00:00.000Z",
  updatedAt: "2018-10-10T00:00:00.000Z",
};

module.exports = UserFixtures;
