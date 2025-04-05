import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@ApiOkResponse({
		type: UserResponseDto,
	})
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create({
			data: createUserDto,
		});
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({
		type: UserResponseDto,
		isArray: true,
	})
	findAll() {
		return this.usersService.findMany();
	}

	@Get(':id')
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@ApiOkResponse({
		type: UserResponseDto,
	})
	findOne(@Param('id') id: string) {
		return this.usersService.findUnique({
			where: {
				id: +id,
			},
		});
	}

	@Patch(':id')
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@ApiOkResponse({
		type: UserResponseDto,
	})
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update({
			where: {
				id: +id,
			},
			data: updateUserDto,
		});
	}

	@Delete(':id')
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@ApiOkResponse({
		type: UserResponseDto,
	})
	remove(@Param('id') id: string) {
		return this.usersService.remove({
			where: {
				id: +id,
			},
		});
	}
}
