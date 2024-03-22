import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { EnvironmentVariables } from './_utils/config';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './middleware/Interceptor.middleware';
import { CounterRequestService } from './middleware/counter-request.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {
    origin: "*"
  }});
  
  
  
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  
  const counterRequestService = app.get(CounterRequestService);
  app.useGlobalInterceptors(new LoggingInterceptor(counterRequestService));
  
  app
  .setGlobalPrefix('api/v1')
  .useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
    )
    .enableCors();
    
    const config = new DocumentBuilder()
    .setTitle('SKELETON API')
    .setDescription('Routes description of the SKELETON API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
    const swaggerCustomOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
        tryItOutEnabled: true,
        displayRequestDuration: true,
        filter: true,
      },
    };
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/doc', app, document, swaggerCustomOptions);
    
    const configService = app.get(ConfigService<EnvironmentVariables, true>);
    return app.listen(configService.get('PORT'));
  }
  
  void bootstrap();
