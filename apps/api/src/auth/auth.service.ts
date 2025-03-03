import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { verify } from 'argon2';
import { SignInInput } from 'src/auth/dto/signin.input';
import { AuthJwtPayload } from 'src/auth/types/auth-jwtPayload';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from 'src/user/dto/create-user.input';

@Injectable()
export class AuthService {

    constructor(private prismaService: PrismaService, private jwtService:JwtService){}
    async validateLocalUser({email, password}: SignInInput){
        const user = await this.prismaService.user.findUnique({
            where:{
                email,
            }
        })

        if(!user) throw new UnauthorizedException("User not found");

        const passwordMatched = await verify(user.password ?? "",password)
        if(!passwordMatched) throw new UnauthorizedException("Invalid Credentials")

        return user;
        
    }

    async generateToken(userId: number)
    {
        const payload : AuthJwtPayload ={sub:userId};
        const accessToken = await this.jwtService.signAsync(payload)

        return {accessToken};
    }

    async login(user:User)
    {
        const {accessToken} = await this.generateToken(user.id);
        return {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            accessToken
        }
    } 

    async validateJwtUser(userId: number)
    {
        const user = await this.prismaService.user.findUnique({
            where:{
                id: userId,
            }
        })

        if(!user) throw new UnauthorizedException("User not found")

        const currentUser = {id: user.id}
        return currentUser;
    }

    async validateGoogleUser(googleUser:CreateUserInput)
    {
        const user = await this.prismaService.user.findUnique({
            where:{
                email:googleUser.email
            }
        })
        if(user){
            const {password, ...authUser} = user
            return authUser
        }
        const dbUser =  await this.prismaService.user.create({
            data:{
                ...googleUser
            }
        })
        const {password, ...authUser} = dbUser;
        authUser
    }
}
