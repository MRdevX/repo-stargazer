import { Module } from "@nestjs/common";
import { CoreModule } from "./core/core.module";
import { GithubModule } from "./github/github.module";

const modules = [GithubModule];

@Module({
  imports: [CoreModule, ...modules],
})
export class AppModule {}
