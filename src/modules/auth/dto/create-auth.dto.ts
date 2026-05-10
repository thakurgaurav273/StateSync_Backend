import { IsEmail, Matches } from "class-validator";

export class CreateAuthDto {
  @IsEmail()
  email: string;
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      "Password must contain uppercase, lowercase, number, special character and minimum 8 characters",
  })
  password: string;
}
