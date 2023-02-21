module.exports = (sequelize, DataTypes) => {
  const Datetime = sequelize.define(
    "Datetime",
    {
      fullDate: {
        type: DataTypes.STRING(50),
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
      date: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      day: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      week: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      weekId: {
        type: DataTypes.STRING(6),
        allowNull: true,
      },
      // d_delYn: {
      //   type: DataTypes.CHAR(1), //삭제여부 : Y, N
      //   allowNull: false,
      // },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false,
    }
  );
  Datetime.associate = (db) => {
  };

  return Datetime
}