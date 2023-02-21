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
        type: DataTypes.CHAR(10),
        allowNull: false,
      },
      k_delYN: {
        type: DataTypes.CHAR(1), //삭제여부 : Y, N
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Keyword.associate = (db) => {
    
  };
  return Keyword;
};
