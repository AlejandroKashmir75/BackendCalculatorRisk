import { Controller, Get, Res, Req, HttpException, HttpStatus } from '@nestjs/common';
import type { Response, Request } from 'express';
import { MetricsService } from './metrics.service';

function checkBasicAuth(req: Request): boolean {
  const user = process.env.METRICS_USER;
  const pass = process.env.METRICS_PASS;
  if (!user || !pass) return true; // sin auth si no hay envs
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Basic ')) return false;
  const decoded = Buffer.from(auth.slice(6), 'base64').toString('utf8');
  return decoded === `${user}:${pass}`;
}

@Controller()
export class MetricsController {
  constructor(private readonly metrics: MetricsService) {}

  @Get('/metrics')
  async getMetrics(@Req() req: Request, @Res() res: Response) {
    if (!checkBasicAuth(req)) {
      res.setHeader('WWW-Authenticate', 'Basic realm="metrics"');
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    res.setHeader('Content-Type', this.metrics.registry.contentType);
    res.send(await this.metrics.getMetrics());
  }
}
