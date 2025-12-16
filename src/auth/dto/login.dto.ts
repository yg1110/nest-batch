import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'test@example.com',
    description: '가입한 이메일',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password1234',
    description: '비밀번호',
  })
  @IsString()
  password: string;
}
