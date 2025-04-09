import { Module } from '@nestjs/common';
import { HelpRequestsService } from './help-requests.service';
import { HelpRequestsController } from './help-requests.controller';

@Module({
	controllers: [HelpRequestsController],
	providers: [HelpRequestsService],
	exports: [HelpRequestsService],
})
export class HelpRequestsModule {}
