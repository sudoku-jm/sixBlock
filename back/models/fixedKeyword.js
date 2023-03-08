module.exports = (sequelize, DataTypes) => {
  const FixedKeyword = sequelize.define(
    "FixedKeyword",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
      },
      fixedKeyword: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      f_delYN: {
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
  FixedKeyword.associate = (db) => {
    db.FixedKeyword.belongsTo(db.Keyword);
  };
  return FixedKeyword;
};
