import knex from "knex";

const connectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const createKnexConnection = () =>
  knex({
    client: 'pg',
    connection: connectionConfig,
    postProcessResponse: (result, queryContext) => {
      let newResult = result.rows ? result.rows : result;
      if (Array.isArray(newResult)) {
        newResult = newResult.map((row) => convertKeysMiddleware(row));
        if (queryContext && (queryContext.limit === 1 || queryContext.limit === '1')) {
          [newResult] = newResult;
        }
      } else {
        newResult = convertKeysMiddleware(result);
      }
      return newResult;
    },
  });

const snakeToCamel = (s) => s.replace(/(_\w)/g, (c) => c[1].toUpperCase());

const convertKeysMiddleware = (data) => {
  if (data) {
    return Object.keys(data).reduce(
      (previous, key) => ({ ...previous, [snakeToCamel(key)]: data[key] }),
      {}
    );
  }
  return null;
};

const knexConnection = createKnexConnection();

export default {
  knexConnection,
};
