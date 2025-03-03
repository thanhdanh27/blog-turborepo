import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { GoogleAuthGuard } from 'src/auth/guards/google-auth/google-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @UseGuards(GoogleAuthGuard)
    @Get("google/login")
    googleLogin(){}

    @UseGuards(GoogleAuthGuard)
    @Get("google/callback")
    async googleCallback(@Request() req, @Res() res:Response){
       const userData = await this.authService.login(req.user)
        res.redirect(`https://blog-turborepo.vercel.app/api/auth/google/callback?userId=${userData.id}&name=${userData.name}&avatar=${userData.avatar}&accessToken=${userData.accessToken}`)
    }

    @UseGuards(JwtAuthGuard)
    @Get("verify-token")
    verify(){
        return "ok"
    }

}
