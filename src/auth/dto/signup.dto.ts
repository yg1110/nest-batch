import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({
    example: 'test@example.com',
    description: '사용자 이메일',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password1234',
    description: '비밀번호 (최소 8자)',
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: '홍길동',
    description: '사용자 이름',
    nullable: true,
  })
  @IsString()
  name: string;
}
