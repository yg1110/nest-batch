export class UserResponseDto {
  id: number;
  email: string;
  name: string | null;
  password: string;
  createdAt: Date;
}
