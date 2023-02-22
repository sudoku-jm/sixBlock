module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      //users 테이블 생성
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      nickname: {
        type: DataTypes.STRING(10), //STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: false,
        // unique: false,
      },
      password: {
        type: DataTypes.STRING(100), //암호화 하면 늘어나기 때문
        allowNull: true,
      },
      profile: {
        type: DataTypes.STRING(200), //이미지 URL 경로
        allowNull: true,
      },
      u_delYN: {
        type: DataTypes.STRING(1), //삭제여부 : Y, N
        allowNull: false,
        defaultValue : "N"
      },
      email : {
        type : DataTypes.STRING(30), //문자열 30자 이내
        allowNull : true,
        unique : true,
      }
    },
    {
      charset: "utf8", //이모티콘 : utf8mb4
      collate: "utf8_general_ci",
      paranoid : true,
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Block, { foreignKey: "userId" }); //User -> Block 여러개 가짐
    db.User.hasMany(db.Keyword); //User -> keyword 여러개 가짐
  };
  return User;
};
