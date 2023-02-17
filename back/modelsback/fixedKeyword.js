module.exports = (sequelize, DataTypes) => {
  const FixedKeyword = sequelize.define(
    "FixedKeyword",
    {
      FixedKeyword: {
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
  FixedKeyword.associate = (db) => {
  };
  return FixedKeyword
}