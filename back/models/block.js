module.exports = (sequelize, DataTypes) => {
  const Block = sequelize.define(
    "Block",
    {
      id : {
        type:DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncremenet : false,
      },
      // keyword: {
      //   type: DataTypes.STRING(50), //50글자이하 제한
      //   allowNull: true, //null일 경우 fixedKeyword 에서 가져오기
      // },
      // typeId: {
      //   //아침/점심/저녁, 블록1/2 => 코드로 관리
      //   type: DataTypes.STRING(10),
      //   allowNull: false,
      // },
      // dayId: {
      //   //날짜 정보 => 날짜 테이블에서 가져오기
      //   type: DataTypes.STRING(10),
      //   allowNull: false,
      // },
      isFinished: {
        //할일 완료 여부 Y, N
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      // userid: {
      //   //유저의 id 가져오기 (seq x)
      //   type: DataTypes.STRING(20),
      //   allowNull: false,
      // },
      b_delYn: {
        type: DataTypes.STRING(1), //삭제여부 : Y, N
        allowNull: false,
      },
    },
    {
      charset: "utf8", //이모티콘 : utf8mb4
      collate: "utf8_general_ci",
    }
  );
  Block.associate = (db) => {
    db.Block.belongsTo(db.User, {foreignKey: 'userId', sourceKey : 'userid'});
    db.Block.belongsTo(db.Datetime );
    db.Block.belongsTo(db.Code );
    db.Block.hasMany(db.Keyword );
  };
  return Block;
};
