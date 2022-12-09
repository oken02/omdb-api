const env = process.env;

module.exports = {
  PORT:  env.PORT || 3009,

  PGDATABASE: env.PGDATABASE ||  "omdb",
  PGHOST: env.PGHOST || "localhost",
  PGPORT: env.PGPORT || "5432",
  PGUSER: env.PGUSER || "postgres",
  PGPASSWORD: env.PGPASSWORD || "passwd",
};

