module.exports = (sequelize, DataTypes) => {
  const Datetime = sequelize.define(
    "Datetime",
    {
      fullDate: {                 //날짜
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      year: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },
      month: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      day: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      week: {                     //주차
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      d_delYn: {
        type: DataTypes.STRING(1), //삭제여부 : Y, N
        allowNull: true,
        defaultValue: "N",
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false,
    }
  );
  Datetime.associate = (db) => {
    db.Datetime.hasMany(db.Block);
  };

  return Datetime;
};
