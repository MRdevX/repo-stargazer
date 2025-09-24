import { registerAs } from "@nestjs/config";

export default registerAs("github", () => ({
  apiToken: process.env.GITHUB_API_TOKEN,
  baseUrl: process.env.GITHUB_BASE_URL || "https://api.github.com",
}));
