import { Injectable } from '@nestjs/common';
import { signInDto, signUpDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as argon from 'argon2';
import { ServiceReturnInterface } from 'src/interfaces';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

	async signIn(dto: signInDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		});
		if (!user) {
			const serviceError: ServiceReturnInterface = {
				error: {
					type: 'Forbidden',
					message: 'Invalid Credentials'
				}
			};
			return serviceError;
		}
		const isValid = await argon.verify(user.password, dto.password);
		if (!isValid) {
			const serviceError: ServiceReturnInterface = {
				error: {
					type: 'Forbidden',
					message: 'Invalid Credentials'
				}
			};
			return serviceError;
		}

		const data = await this.generateJWT(user.id, user.email);
		const resp: ServiceReturnInterface = {
			data: data
		};
		return resp;
	}
	async signUp(dto: signUpDto) {
		const hashedPassword = await argon.hash(dto.password);
		try {
			const user = await this.prisma.user.create({
				data: {
					name: dto.name,
					email: dto.email,
					phone: dto.phone,
					type: dto.type,
					password: hashedPassword
				}
			});
			if (!user) {
				const serviceError: ServiceReturnInterface = {
					error: {
						type: 'NotFound',
						message: 'User Not Found'
					}
				};
				return serviceError;
			}
			const data = await this.generateJWT(user.id, user.email);
			const resp: ServiceReturnInterface = {
				data: data
			};
			return resp;
		} catch (e) {
			const serviceError: ServiceReturnInterface = {
				error: {
					type: 'Forbidden',
					message: e.meta.target
				}
			};
			return serviceError;
		}
	}

	async generateJWT(userId: number, email: string) {
		const payload = {
			userId,
			email
		};
		const secret = this.config.get('JWT_SECRET');
		const token = await this.jwt.signAsync(payload, {
			expiresIn: '720h',
			secret: secret
		});
		return {
			access_token: token
		};
	}

	async getCurrentLoggedInUser(userId) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				id: true,
				name: true,
				email: true,
				phone: true,
				type: true
			}
		});
		if (!user) {
			const serviceError: ServiceReturnInterface = {
				error: {
					type: 'Forbidden',
					message: 'Invalid Credentials'
				}
			};
			return serviceError;
		}
		const resp: ServiceReturnInterface = {
			data: user
		};
		return resp;
	}
}
