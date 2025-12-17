import { Injectable } from '@nestjs/common';
import { ExampleJob } from '../jobs/example.job';

export const BatchJobId = {
  EXAMPLE_JOB: 'EXAMPLE_JOB',
} as const;

@Injectable()
export class JobRegistry {
  constructor(private readonly exampleJob: ExampleJob) {}

  get(jobId: string) {
    const jobs = {
      [BatchJobId.EXAMPLE_JOB]: this.exampleJob,
    };

    return jobs[jobId];
  }
}
