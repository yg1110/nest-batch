import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BatchRunner } from './runner/batch.runner';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);

  constructor(
    private readonly runner: BatchRunner,
    private readonly prisma: PrismaService,
  ) {}

  // 초기 배치 데이터 생성
  // async onModuleInit() {
  //   await this.prisma.batchSchedule.create({
  //     data: {
  //       jobId: 'EXAMPLE_JOB',
  //       scheduledAt: new Date(), // 즉시 실행
  //     },
  //   });
  // }

  // 1분마다 실행
  // @Cron(CronExpression.EVERY_MINUTE)
  // async runEveryMinute() {
  //   this.logger.log('Cron triggered: EVERY_MINUTE');
  //   await this.runner.run();
  // }

  // 10초마다 실행 (개발/테스트용)
  @Cron('*/10 * * * * *')
  async runEvery10Seconds() {
    this.logger.debug('Cron triggered: EVERY_10_SECONDS');
    await this.runner.run();
  }
}
