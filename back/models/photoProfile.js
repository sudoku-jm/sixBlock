module.exports = (sequelize, DataTypes) => {
  const PhotoProfile = sequelize.define(
    "PhotoProfile",
    {
      src: {
        type: DataTypes.STRING(200), //이미지 URL 경로는 길어질 수 있음.
        allowNull: false,
      },
    },
    {
      modelName: "PhotoProfile",
      tableName: "PhotoProfile",
      chareset: "utf8",
      collate: "utf8_general_ci",
      sequelize,
    }
  );
  User.associate = (db) => {
    db.PhotoProfile.belongsTo(db.User);
  };
  return PhotoProfile;
};
