module.exports = (sequelize, DataTypes) => {
  const Block = sequelize.define(
    "Block",
    {
      isFinished: {
        //할일 완료 여부 Y, N
        type: DataTypes.STRING(1),
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
    db.Block.belongsTo(db.User, { foreignKey: "userId", targetKey: "userid" });
    db.Block.belongsTo(db.Datetime);
    db.Block.belongsTo(db.Code);
    db.Block.belongsTo(db.Keyword);
  };
  return Block;
};
