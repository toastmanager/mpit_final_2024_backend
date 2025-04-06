import { ApiProperty } from '@nestjs/swagger';
import { HelpRequestStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateHelpRequetStatusDto {
	@ApiProperty({
		enum: HelpRequestStatus,
	})
	@IsEnum(HelpRequestStatus)
	status: HelpRequestStatus;
}
