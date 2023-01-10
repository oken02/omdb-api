const { Sequelize } = require("sequelize");
const env = process.env;

const db = new Sequelize(env.PGDATABASE, env.PGUSER, env.PGPASSWORD, {
  logging: false,
  host: env.PGHOST,
  port: env.PGPORT,
  dialect: "postgres",
});

module.exports = db;
