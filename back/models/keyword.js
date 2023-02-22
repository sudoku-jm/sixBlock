module.exports = (sequelize, DataTypes) => {
  const Keyword = sequelize.define(
    "Keyword",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncremenet: false,
      },
      keyword: {
        type: DataTypes.STRING(50), //50글자이하 제한
        allowNull: true, //null일 경우 fixedKeyword 에서 가져오기
        // unique: true,
      },
      // fixedKeywordId: {
      //   type: DataTypes.CHAR(10),
      //   allowNull: false,
      // },
      k_delYN: {
        type: DataTypes.STRING(1), //삭제여부 : Y, N
        allowNull: false,
        defaultValue: "N",
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Keyword.associate = (db) => {
    db.Keyword.belongsToMany(db.FixedKeyword, { through: "fixKeywords" });
    db.Keyword.belongsTo(db.Block);
  };
  return Keyword;
};
