import { IsEmail, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "Password must contain uppercase, lowercase, number, special character and minimum 8 characters",
    }
  )
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
