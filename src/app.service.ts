import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './providers/devConfigService';

@Injectable()
export class AppService {
  constructor(
    private devConfigService: DevConfigService,
    @Inject('CONFIG')
    private config: {
      port: string;
    },
  ) {
    console.log(`${config.port}`);
  }
  getHello(): string {
    return `Hello World! i am learning nestjs ${this.devConfigService.DBHOST} ${this.config.port}`;
  }
}
