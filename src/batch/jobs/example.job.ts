import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ExampleJob {
  private readonly logger = new Logger(ExampleJob.name);

  async execute(payload?: any) {
    this.logger.log('ExampleJob 실행');
    this.logger.log(payload);

    // 실제 배치 로직
  }
}
