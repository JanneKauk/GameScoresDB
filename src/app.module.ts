import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GamesModule } from "./games/games.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthenticationModule } from "./authentication/authentication.module";
import { configValidationSchema } from "./config.schema";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    GamesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Since this is a dependancy, nestjs will wait for ConfigModule
      inject: [ConfigService], // dependency injection
      useFactory: async (configService: ConfigService) => { // gets called by nestjs when we want to initialize the module
        return {
          type: "mysql",
          autoLoadEntities: true,
          synchronize: false, // keeps database schema in sync. Basically drops and creates all the tables again?
          host: configService.get("DB_HOST"),
          port: configService.get("DB_PORT"),
          username: configService.get("DB_USERNAME"),
          password: configService.get("DB_PASSWORD"),
          database: configService.get("DB_DATABASE")
        };
      }
    }),
    AuthenticationModule

  ]
})
export class AppModule {
}
