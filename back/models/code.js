module.exports = (sequelize, DataTypes) => {
  const Code = sequelize.define(
    "Code",
    {
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      desc1: {
        //코드 세부
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      desc2: {
        //코드 세부
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      c_delYn: {
        type: DataTypes.STRING(1), //삭제여부 : Y, N
        allowNull: false,
        defaultValue: "N",
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false,
    }
  );
  Code.associate = (db) => {
    db.Datetime.hasMany(db.Block);
  };
  return Code;
};
