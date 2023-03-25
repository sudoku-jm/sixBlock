module.exports = (sequelize, DataTypes) => {
  const Keyword = sequelize.define(
    "Keyword",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      keyword: {
        type: DataTypes.STRING(50), //50글자이하 제한
        allowNull: true, //null일 경우 fixedKeyword 에서 가져오기
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
    db.Keyword.hasMany(db.FixedKeyword);
    db.Keyword.hasMany(db.Block);
    db.Keyword.belongsTo(db.User, {
      foreignKey: "userId",
      sourceKey: "userid",
    });
  };
  return Keyword;
};