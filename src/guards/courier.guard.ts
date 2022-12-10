import { CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import jwtDecode from 'jwt-decode';

import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
@UseGuards(AuthGuard('jwt'))
export class CourierGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = request.headers.authorization.split(' ')[1];
		const user: { userId: number } = jwtDecode(token);

		const configService = new ConfigService();
		const prismaService = new PrismaService(configService);
		const jwtService = new JwtService();
		const authService = new AuthService(prismaService, jwtService, configService);

		const { data } = await authService.getCurrentLoggedInUser(user.userId);

		return data.type === 'company';
	}
}
