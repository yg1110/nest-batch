import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JobRegistry } from './job.registry';

@Injectable()
export class BatchRunner {
  private readonly logger = new Logger(BatchRunner.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly registry: JobRegistry,
  ) {}

  async run() {
    const schedules = await this.prisma.batchSchedule.findMany({
      // where: {
      //   status: 'PENDING',
      //   scheduledAt: { lte: new Date() },
      // },
    });

    for (const schedule of schedules) {
      const job = this.registry.get(schedule.jobId);
      if (!job) continue;

      await this.prisma.batchSchedule.update({
        where: { id: schedule.id },
        data: { status: 'RUNNING' },
      });

      try {
        await job.execute(schedule.payload);

        await this.prisma.batchSchedule.update({
          where: { id: schedule.id },
          data: {
            status: 'DONE',
            executedAt: new Date(),
          },
        });
      } catch (e) {
        await this.prisma.batchSchedule.update({
          where: { id: schedule.id },
          data: { status: 'FAILED' },
        });

        this.logger.error(e);
      }
    }
  }

  async runOnce(jobId: string, payload?: any) {
    const job = this.registry.get(jobId);

    if (!job) {
      throw new Error(`Unknown jobId: ${jobId}`);
    }

    await job.execute(payload);
  }
}
