import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { BatchRunner } from './runner/batch.runner';
import { JobRegistry } from './runner/job.registry';
import { ExampleJob } from './jobs/example.job';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchController } from './batch.controller';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [BatchService, BatchRunner, JobRegistry, ExampleJob],
  controllers: [BatchController],
})
export class BatchModule {}
