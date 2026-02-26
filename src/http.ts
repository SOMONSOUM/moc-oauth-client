import axios from "axios";
import { config } from "./config";

export const http = axios.create({
  baseURL: config.baseUrl,
  headers: {
    "Content-Type": "application/json",
    "x-client-id": config.clientId,
  },
});
