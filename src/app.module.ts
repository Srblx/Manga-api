import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { EnvironmentVariables, validateEnv } from './_utils/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LikesModule } from './likes/likes.module';
import { CounterRequestModule } from './middleware/counter-request.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { NewsModule } from './news/news.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate: validateEnv, isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<EnvironmentVariables, true>) => ({
        uri: configService.get('MONGODB_URL'),
        dbName: configService.get('MONGODB_DBNAME'),
      }),
    }),
    AuthModule,
    UsersModule,
    NewsModule,
    LikesModule,
    CounterRequestModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        LoggerMiddleware
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
