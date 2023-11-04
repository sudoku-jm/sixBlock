export const backUrl =
  process.env.NODE_ENV === "development"
    ? process.env.BACK_API_DEV_URL
    : process.env.BACK_API_PROD_URL
