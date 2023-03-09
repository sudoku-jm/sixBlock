module.exports = (sequelize, DataTypes) => {
  const Datetime = sequelize.define(
    "Datetime",
    {
      fullDate: {                 //날짜
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      year: {                     // 년
        type: DataTypes.STRING(4),
        allowNull: true,
      },
      month: {                    //월
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      date: {                     // 일
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      day: {                      // 요일 
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      week: {                     // 주차
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      weekId: {                   // 년 + 주차
        type: DataTypes.STRING(6),
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
