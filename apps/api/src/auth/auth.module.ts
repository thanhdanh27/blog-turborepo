import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { GoogleAuthGuard } from 'src/auth/guards/google-auth/google-auth.guard';
import { GoogleStrategy } from 'src/auth/strategies/google.stratygy';
import { AuthController } from './auth.controller';

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: configService.get<string>("JWT_EXPIRES_IN") },
    })
  })],
  providers: [AuthResolver, AuthService, PrismaService, UserService, JwtStrategy, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
