import { HttpService } from "@nestjs/axios";
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { GitHubSearchResponse, RepositorySearchParams } from "./models/github.interface";

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);
  private readonly baseUrl: string;
  private readonly apiToken: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    const githubConfig = this.configService.get("github");
    this.baseUrl = githubConfig.baseUrl;
    this.apiToken = githubConfig.apiToken;
  }

  async searchRepositories(params: RepositorySearchParams): Promise<GitHubSearchResponse> {
    const url = `${this.baseUrl}/search/repositories?${this.buildQuery(params)}`;

    this.logger.log(`Searching repositories: ${params.query}`);

    try {
      const response = await firstValueFrom(
        this.httpService.get<GitHubSearchResponse>(url, {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: this.apiToken ? `Bearer ${this.apiToken}` : "",
          },
        }),
      );

      this.logger.log(`Found ${response.data.items.length} repositories`);
      return response.data;
    } catch (error) {
      this.logger.error(`GitHub API request failed: ${error.message}`);
      throw new InternalServerErrorException("Failed to fetch repositories from GitHub");
    }
  }

  private buildQuery(params: RepositorySearchParams): string {
    const filters = [
      params.language && `+language:${params.language}`,
      params.created && `+created:${params.created}`,
    ].filter(Boolean);

    const fullSearchString = params.query + filters.join("");
    return `q=${encodeURIComponent(fullSearchString)}`;
  }
}
