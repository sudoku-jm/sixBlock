module.exports = (sequelize, DataTypes) => {
  const PhotoProfile = sequelize.define(
    "PhotoProfile",

    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
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
      paranoid: true,
    }
  );
  PhotoProfile.associate = (db) => {
    db.PhotoProfile.belongsTo(db.User, {
      foreignKey: "userId",
      sourceKey: "userid",
    });
  };
  return PhotoProfile;
};
