import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GamesModule } from './games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    GamesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Since this is a dependancy, nestjs will wait for ConfigModule
      inject: [ConfigService], // dependency injection
      useFactory: async (configService: ConfigService) => { // gets called by nestjs when we want to initialize the module
        return {
        type: 'mysql',
        autoLoadEntities: true,
        synchronize: false, // keeps database schema in sync. Basically drops and creates all the tables again?
        host: configService.get('DB_HOST'),
        port: 3309,
        username: "root",//configService.get('DB_USERNAME'),
        password: "beenis",//configService.get('DB_PASSWORD'),
        database: "GameReview"//configService.get('DB_DATABASE'),
        };
      },
    })

  ],
})
export class AppModule {}
