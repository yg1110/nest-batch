import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BatchRunner } from './runner/batch.runner';
import { RunBatchDto } from './dto/run-batch.dto';

@ApiTags('Batch')
@Controller('batch')
export class BatchController {
  constructor(private readonly runner: BatchRunner) {}

  @Post('run')
  @ApiOperation({ summary: '배치 즉시 실행 (Swagger)' })
  async run(@Body() dto: RunBatchDto) {
    await this.runner.runOnce(dto.jobId, dto.payload);
    return { status: 'OK' };
  }
}
