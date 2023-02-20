const Sequelize = require("sequelize")
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]
const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.Block = require("./block")(sequelize, Sequelize)
db.User = require("./user")(sequelize, Sequelize)
db.Keyword = require("./keyword")(sequelize, Sequelize);
db.FixedKeyword = require("./fixedKeyword")(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
