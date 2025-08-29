import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // === CORS ===
  const fromEnv = (process.env.CORS_ORIGIN || 'http://localhost:5173').replace(/\/$/, ''); // quita '/' final
  const allowlist = new Set([fromEnv, 'http://localhost:5173']);

  app.enableCors({
    origin(origin, cb) {
      // origin puede ser undefined (curl/Postman). Permite si no hay Origin.
      if (!origin || allowlist.has(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // ponlo en false si no usas cookies
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
