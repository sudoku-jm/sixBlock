module.exports = (sequelize, DataTypes) => {
  const Keyword = sequelize.define(
    "Keyword",
    {
      keyword: {
        type: DataTypes.STRING(50), 
        allowNull: false,
        unique: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Keyword.associate = (db) => {
     db.Keyword.hasMany(db.Block),
     db.Keyword.belongsTo(db.FixedKeyword)
  };
  return Keyword
}