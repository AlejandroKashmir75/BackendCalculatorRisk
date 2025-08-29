import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // === CORS ===
  const fromEnv = (process.env.CORS_ORIGIN || 'http://localhost:5173').replace(/\/$/, ''); // quita '/' final
  const allowlist = new Set([fromEnv, 'http://localhost:5173']);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET','POST','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type','Authorization'],
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0'); // asegura bind externo en Railway
  console.log(`Application is running on port ${port}`);
}
bootstrap();
