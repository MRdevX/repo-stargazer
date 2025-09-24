import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResponseInterceptor } from "@root/app/core/interceptors/response.interceptor";
import { RepositorySearchDto } from "./dto/repository-search.dto";
import { GithubService } from "./github.service";

@ApiTags("GitHub")
@Controller("github")
@UseInterceptors(ResponseInterceptor)
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get("search")
  @ApiOperation({ summary: "Search GitHub repositories" })
  @ApiResponse({ status: 200, description: "Repositories found successfully" })
  async searchRepositories(@Query() params: RepositorySearchDto) {
    return this.githubService.searchRepositories(params);
  }

  @Get("health")
  @ApiOperation({ summary: "Check GitHub service health" })
  @ApiResponse({ status: 200, description: "Service is healthy" })
  healthCheck() {
    return { message: "GitHub service is healthy", status: "ok" };
  }
}
