import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './admin/users/users.module';

@Module({
	imports: [AuthModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true }), UsersModule],
	controllers: [],
	providers: []
})
export class AppModule {}
