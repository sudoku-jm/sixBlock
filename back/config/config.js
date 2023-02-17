const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "sixblock",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "sixblock",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "sixblock",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  },
};
