import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user-response.dto';
import { Role } from '@prisma/client';

export class UserSensitiveDto extends UserDto {
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
