module.exports = (sequelize, DataTypes) => {
  const Keyword = sequelize.define(
    "Keyword",
    {
      keyword: {
        type: DataTypes.STRING(50), //50글자이하 제한
        allowNull: true, //null일 경우 fixedKeyword 에서 가져오기
        // unique: true,
      },
      fixedKeywordId: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      k_delYN: {
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
  Keyword.associate = (db) => {
    db.Keyword.hasMany(db.User, { foreignKey: "userId" }); //User -> keyword 여러개 가짐
    db.Keyword.hasMany(db.Block, {as : "keywordId"});
    db.Keyword.hasMany(db.FixedKeyword);
  };
  return Keyword;
};
