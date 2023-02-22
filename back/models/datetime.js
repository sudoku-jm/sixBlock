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
        allowNull: false,
      },
      month: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      day: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      week: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      weekId: {
        type: DataTypes.STRING(6),
        allowNull: false,
      },
      d_delYn: {
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
  Datetime.associate = (db) => {
    db.Datetime.hasMany(db.Block);
  };

  return Datetime;
};
