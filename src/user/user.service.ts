import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserResponseDto } from './dto/user.response.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserResponseDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new NotFoundException('존재하지 않는 사용자입니다.');
      }
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password,
        createdAt: user.createdAt,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        '사용자 이메일 조회 중 에러가 발생했습니다.',
      );
    }
  }

  async findById(id: number): Promise<UserResponseDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException('존재하지 않는 사용자입니다.');
      }
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password,
        createdAt: user.createdAt,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        '사용자 ID 조회 중 에러가 발생했습니다.',
      );
    }
  }

  async create(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<UserResponseDto> {
    try {
      const user = await this.prisma.user.create({ data });
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password,
        createdAt: user.createdAt,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        '사용자 생성 중 에러가 발생했습니다.',
      );
    }
  }
}
