import dotenv from "dotenv";

dotenv.config();

const config = {
  dbHost: process.env.PORT || "8000",
  api_key: process.env.API_KEY || "b7cfc9f3d468c6c050665204449e8e99",
};

export default config;
