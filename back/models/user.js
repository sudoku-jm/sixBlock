module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      //users 테이블 생성
      userid: {
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
      // profile: {
      //   type: DataTypes.STRING(200), //이미지 URL 경로
      //   allowNull: false,
      // },
      // email : {
      //   type : DataTypess.STRING(30), //문자열 30자 이내
      //   allowNull : false,
      //   unique : true,
      // }
    },
    {
      charset: "utf8", //이모티콘 : utf8mb4
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Block, {foreignKey: "userid"}); //User -> Block 여러개 가짐
    db.User.hasMany(db.Keyword); //User -> keyword 여러개 가짐
    // db.User.belongsTo(db.Block, { through: "plan" });
  };
  return User;
};
