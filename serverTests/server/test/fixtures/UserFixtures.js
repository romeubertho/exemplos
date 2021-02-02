const CardFixtures = {};

CardFixtures.defaultRequestBody = {
  name: "Jeffzitos",
  lastname: "Tusqueira",
  email: "jeffzitos@tusca.com.br",
  gender: "descubra",
};

CardFixtures.defaultUser = {
  name: "Jeffzitos",
  lastname: "Tusqueira",
  email: "jeffzitos@tusca.com.br",
  gender: "descubra",
  createdAt: "2018-10-10T00:00:00.000Z",
  updatedAt: "2018-10-10T00:00:00.000Z",
};

CardFixtures.testRequestBody = {
  name: "Romeu",
  lastname: "Berthao",
  email: "romeu@usp.br",
  gender: "masc",
};

CardFixtures.testUser = {
  name: "Romeu",
  lastname: "Berthao",
  email: "romeu@usp.br",
  gender: "masc",
  createdAt: "2018-10-10T00:00:00.000Z",
  updatedAt: "2018-10-10T00:00:00.000Z",
};

CardFixtures.nullEmailRequestBody = {
  name: "Romeu",
  lastname: "Berthao",
  gender: "masc",
};

CardFixtures.nullEmailUser = {
  name: "Romeu",
  lastname: "Berthao",
  gender: "masc",
  createdAt: "2018-10-10T00:00:00.000Z",
  updatedAt: "2018-10-10T00:00:00.000Z",
};

module.exports = CardFixtures;
