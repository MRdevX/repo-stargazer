import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import appConfig from "@root/app/config/app.config";
import dbConfig from "@root/app/config/db.config";
import githubConfig from "@root/app/config/github.config";
import redisConfig from "@root/app/config/redis.config";
import sentryConfig from "@root/app/config/sentry.config";
import { CacheModule } from "./cache/cache.module";
import { DatabaseModule } from "./database";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig, githubConfig, redisConfig, sentryConfig],
      envFilePath: [".env"],
    }),
    DatabaseModule.forRoot(),
    CacheModule,
  ],
  exports: [CacheModule],
})
export class CoreModule {}
