import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import appConfig from './config/app/app.config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  /* -***************- */
  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  /* -***************- */

  const logger = new Logger('Main');

  const config: ConfigType<typeof appConfig> = app.get(appConfig.KEY);

  const PORT = config.port;
  await app.listen(PORT, '0.0.0.0', () => {
    logger.log(`App running on port ${PORT}`);
  });
}
bootstrap();
