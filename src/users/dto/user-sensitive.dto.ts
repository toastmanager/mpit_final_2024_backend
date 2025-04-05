import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';
import { Role } from '@prisma/client';

export class UserSensitiveResponseDto extends UserResponseDto {
	@ApiProperty({
		example: '+46701234567',
	})
	tel: string;

	@ApiProperty({
		enum: Role,
		isArray: true,
	})
	roles: Role[];
}
