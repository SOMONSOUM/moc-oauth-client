import dotenv from "dotenv";

dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL!,
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  redirectUri: process.env.REDIRECT_URI!,
};

if (
  !config.baseUrl ||
  !config.clientId ||
  !config.clientSecret ||
  !config.redirectUri
) {
  throw new Error(
    "ENV variables BASE_URL, CLIENT_SECRET, REDIRECT_URI and CLIENT_ID are required",
  );
}
