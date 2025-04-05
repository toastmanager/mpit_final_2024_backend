import { ApiProperty } from '@nestjs/swagger';

export class LogoutDto {
	@ApiProperty()
	refreshToken: string;
}
