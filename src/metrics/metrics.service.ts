import { Injectable } from '@nestjs/common';
import { Registry, collectDefaultMetrics, Counter, Histogram } from 'prom-client';

@Injectable()
export class MetricsService {
  public readonly registry = new Registry();

  public readonly httpRequestsTotal: Counter<string>;
  public readonly httpRequestDuration: Histogram<string>;

  // (Opcional) métrica de negocio
  public readonly risksCreatedTotal: Counter<string>;

  constructor() {
    collectDefaultMetrics({ register: this.registry, prefix: 'app_' });

    this.httpRequestsTotal = new Counter({
      name: 'http_requests_total',
      help: 'Total de solicitudes HTTP',
      labelNames: ['method', 'route', 'status_code'],
      registers: [this.registry],
    });

    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duración de solicitudes HTTP (segundos)',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
      registers: [this.registry],
    });

    this.risksCreatedTotal = new Counter({
      name: 'risks_created_total',
      help: 'Total de riesgos creados',
      labelNames: ['source'],
      registers: [this.registry],
    });
  }

  async getMetrics(): Promise<string> {
    return this.registry.metrics();
  }
}
