import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // === CORS ===
  const fromEnv = (process.env.CORS_ORIGIN || 'http://localhost:5173').replace(/\/$/, ''); // quita '/' final
  const allowlist = new Set([fromEnv, 'http://localhost:5173']);

  app.enableCors({
    origin: (origin, cb) => {
      // Permite Postman/cURL (sin Origin)
      if (!origin) return cb(null, true);
  
      // Permite localhost y cualquier deploy/preview de Vercel
      const allowlist = new Set([
        'http://localhost:5173',
        'http://localhost:3000',
      ]);
      const isVercel = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
  
      return (allowlist.has(origin) || isVercel)
        ? cb(null, true)
        : cb(new Error(`CORS: Origin no permitido -> ${origin}`));
    },
    credentials: false, // usa false si autenticas por Authorization: Bearer <JWT>
    methods: ['GET','HEAD','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization','X-Requested-With','Accept'],
    optionsSuccessStatus: 204,
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
