exports.isLoggedIn = (req, res, next) => {
  //passport에서 제공해주는 isAuthenticated()으로 검사가능.
  console.log("===================req????????", req.isAuthenticated());
  if (req.isAuthenticated()) {
    // 로그인을 한 상태.
    console.log("로그인한 상태");
    next();
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // 로그아웃 한 상태
    console.log("로그아웃한 상태");
    next();
  } else {
    res.status(401).send("로그인하지 않은 사용자만 접근 가능합니다.");
  }
};
