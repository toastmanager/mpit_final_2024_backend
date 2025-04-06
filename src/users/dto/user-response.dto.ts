import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class UserDto {
	@ApiProperty({ description: 'The unique identifier of the user', example: 1 })
	@IsInt()
	id: number;

	@ApiProperty({
		description: 'The creation timestamp of the user',
		example: '2024-03-27T10:46:00.000Z',
	})
	createdAt: Date;

	@ApiProperty({
		description: 'The last update timestamp of the user',
		example: '2024-03-27T10:46:00.000Z',
	})
	updatedAt: Date;
}
