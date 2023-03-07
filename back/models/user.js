module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      //users 테이블 생성
      userid: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
        autoIncremenet: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING(10), //STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100), //암호화 하면 늘어나기 때문
        allowNull: false,
      },
      u_delYN: {
        type: DataTypes.STRING(1), //삭제여부 : Y, N
        allowNull: false,
        defaultValue: "N",
      },
    },
    {
      charset: "utf8", //이모티콘 : utf8mb4
      collate: "utf8_general_ci",
      paranoid: true,
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Keyword, { foreignKey: "userId", sourceKey: "userid" });
    db.User.hasMany(db.Block, { foreignKey: "userId", sourceKey: "userid" });
    db.User.hasMany(db.PhotoProfile, {
      foreignKey: "userId",
      sourceKey: "userid",
    });
  };
  return User;
};
