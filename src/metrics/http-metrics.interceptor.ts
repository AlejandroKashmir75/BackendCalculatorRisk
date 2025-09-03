import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { MetricsService } from './metrics.service';

function normalizeRoute(path?: string) {
  if (!path) return 'unknown';
  return path
    .replace(/\/\d+(\b|\/)/g, '/:id$1')
    .replace(/\/[0-9a-f-]{8,}(\b|\/)/gi, '/:id$1');
}

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
  constructor(private readonly metrics: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = process.hrtime.bigint();
    const http = context.switchToHttp();
    const req: any = http.getRequest();
    const res: any = http.getResponse();

    const method = (req.method || 'GET').toUpperCase();
    const route = normalizeRoute(req.route?.path ?? req.url ?? 'unknown');

    return next.handle().pipe(
      tap({
        next: () => {
          const sec = Number(process.hrtime.bigint() - start) / 1e9;
          const status = String(res.statusCode ?? 200);
          this.metrics.httpRequestsTotal.labels(method, route, status).inc();
          this.metrics.httpRequestDuration.labels(method, route, status).observe(sec);
        },
        error: (err) => {
          const sec = Number(process.hrtime.bigint() - start) / 1e9;
          const status = String(err?.status ?? res.statusCode ?? 500);
          this.metrics.httpRequestsTotal.labels(method, route, status).inc();
          this.metrics.httpRequestDuration.labels(method, route, status).observe(sec);
        },
      }),
    );
  }
}
