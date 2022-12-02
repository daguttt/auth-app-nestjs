import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
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

  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('app.port');
  await app.listen(PORT, '0.0.0.0', () => {
    logger.log(`App running on port ${PORT}`);
  });
}
bootstrap();
