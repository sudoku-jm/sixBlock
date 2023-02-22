module.exports = (sequelize, DataTypes) => {
  const FixedKeyword = sequelize.define(
    "FixedKeyword",
    {
      
      fixedKeyword: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      f_delYN: {
        type: DataTypes.STRING(1), //삭제여부 : Y, N
        allowNull: false,
        defaultValue: "N",
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      paranoid: true,
    }
  );
  FixedKeyword.associate = (db) => {
     db.FixedKeyword.belongsTo(db.Keyword);
  };
  return FixedKeyword
}