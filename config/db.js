const { Sequelize } = require("sequelize");
const variables = require("./variables");

const db = new Sequelize(variables.PGDATABASE, variables.PGUSER, variables.PGPASSWORD, {
  logging: false,
  host: variables.PGHOST,
  port: variables.PGPORT,
  dialect: "postgres"
});

module.exports = db;
