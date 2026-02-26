import dotenv from "dotenv";

dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL!,
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  redirectUri: process.env.REDIRECT_URI!,
};

if (!config.baseUrl || !config.clientId) {
  throw new Error("Missing OAuth environment variables");
}
