import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class RunBatchDto {
  @ApiProperty({ example: 'EXAMPLE_JOB' })
  @IsString()
  jobId: string;

  @ApiProperty({
    required: false,
    example: { foo: 'bar' },
  })
  @IsOptional()
  @IsObject()
  payload?: Record<string, any>;
}
