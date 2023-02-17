module.exports = (sequelize, DataTypes) => {
  const Block = sequelize.define(
    "Block",
    {
      type: {
        //Morning
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      typeNum: {
        //Morning - 1,2
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      day: {
        //Monday
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      date: {
        //2023-02-13
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      isFinished: {
        //true/false
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Block.associate = (db) => {
    db.Block.belongsTo(db.User);
    db.Block.belongsTo(db.Keyword);
  };
  return Block;
};
