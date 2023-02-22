module.exports = (sequelize, DataTypes) => {
  const Block = sequelize.define(
    "Block",
    {
      isFinished: {
        //할일 완료 여부 Y, N
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      userId: {
        //유저의 id 가져오기 (seq x)
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      b_delYn: {
        type: DataTypes.STRING(1), //삭제여부 : Y, N
        allowNull: false,
        defaultValue: "N",
      },
    },
    {
      charset: "utf8", //이모티콘 : utf8mb4
      collate: "utf8_general_ci",
      paranoid: true,
    }
  );
  Block.associate = (db) => {
    db.Block.belongsTo(db.User, { foreignKey: "userId" });
    db.Block.belongsTo(db.Keyword, {foreignKey : 'keywordId'});
    db.Block.belongsTo(db.Datetime);
    db.Block.belongsTo(db.Code);
  };
  return Block;
};
