module.exports = (sequelize, DataTypes) => {
  const Datetime = sequelize.define(
    "Datetime",
    {
      fullDate: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      year : {
        type: DataTypes.CHAR(4),
        allowNull: false,
      },
      month : {
        type: DataTypes.CHAR(2),
        allowNull: false,
      },
      date : {
        type: DataTypes.CHAR(2),
        allowNull: false,
      },
      day : {
        type: DataTypes.CHAR(2),
        allowNull: false,
      },
      week : {
        type: DataTypes.CHAR(2),
        allowNull: false,
      },
      weekId : {
        type: DataTypes.CHAR(6),
        allowNull: false,
      },
      d_delYn: {
        type: DataTypes.CHAR(1), //삭제여부 : Y, N
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Datetime.associate = (db) => {
  };

  const result = Datetime.create({
    fullDate: "2023-01-01",
    year: fullDate.split("-")[0],
    month: fullDate.split("-")[1],
    date: fullDate.split("-")[2],
    week: getWeek(fullDate),
    weekId: {
      type: DataTypes.CHAR(50),
      allowNull: false,
    },
    d_delYn: {
      type: DataTypes.CHAR(1), //삭제여부 : Y, N
      allowNull: false,
    },
  });

  const getWeek = (date) => {
    const currentDate = date.getDate();
    const firstDay = new Date(date.setDate(1)).getDay();

    return Math.ceil((currentDate + firstDay) / 7);
  };

  return Datetime
}