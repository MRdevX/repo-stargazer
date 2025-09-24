import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GithubController } from "./github.controller";
import { GithubService } from "./github.service";

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [GithubService],
  exports: [GithubService],
  controllers: [GithubController],
})
export class GithubModule {}
