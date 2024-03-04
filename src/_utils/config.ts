import { exit } from 'process';
import { IsNumber, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Logger } from '@nestjs/common';

export class EnvironmentVariables {
  @IsNumber()
  PORT: number = 3000;

  @IsString()
  JWT_SECRET: string = 'mY-SUp3r-S3cr3t[JwT]*T0k3n';

  @IsString()
  JWT_EXPIRATION: string = '7d';

  @IsString()
  MONGODB_URL: string = 'mongodb://127.0.0.1:27017';

  @IsString()
  MONGODB_DBNAME: string = 'nest-skeleton';
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length) {
    new Logger(validateEnv.name).error(errors.toString());
    exit();
  }
  return validatedConfig;
}
