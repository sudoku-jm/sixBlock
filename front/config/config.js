export const backUrl =
  process.env.NODE_ENV === "development"
    ?
      "http://localhost:5500"
    : "http://192.168.1.128:5500";
