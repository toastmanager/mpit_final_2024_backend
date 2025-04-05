import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsEnum } from 'class-validator';
import { HelpRequestStatus } from '@prisma/client';
import { CreateHelpRequestDto } from './create-help-request.dto';

export class UpdateHelpRequestDto extends PartialType(CreateHelpRequestDto) {
	@ApiPropertyOptional({
		description: 'ID of the volunteer who accepted the request',
		example: 2,
	})
	@IsInt()
	@IsOptional()
	volunteerId?: number;

	@ApiPropertyOptional({
		description: 'Updated status of the help request',
		enum: HelpRequestStatus,
	})
	@IsEnum(HelpRequestStatus)
	@IsOptional()
	status?: HelpRequestStatus;
}
