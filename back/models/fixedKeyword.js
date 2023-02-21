module.exports = (sequelize, DataTypes) => {
  const FixedKeyword = sequelize.define(
    "FixedKeyword",
    {
      id : {
      type:DataTypes.INTEGER,
      primaryKey : true,
      allowNull : false,
      autoIncremenet : false,
    },
    fixedKeyword: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      f_delYN: {
        type: DataTypes.CHAR(1), //삭제여부 : Y, N
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps : false
    }
  );
  FixedKeyword.associate = (db) => {
    db.FixedKeyword.belongsToMany(db.Keyword,{through : 'fixKeywords'});
  };
  return FixedKeyword
}