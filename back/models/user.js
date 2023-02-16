module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      //users 테이블 생성
      nickname: {
        type: DataTypes.STRING(10), //STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100), //암호화 하면 늘어나기 때문
        allowNull: true,
      },
    },
    {
      charset: "utf8", //이모티콘 : utf8mb4
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Block)
    db.User.hasMany(db.Keyword)
  };
  return User
}