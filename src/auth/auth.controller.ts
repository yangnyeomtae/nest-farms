import { Body, Controller, Logger, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/authCredential.dto';
import { User } from './schemas/user.schema';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    private logger = new Logger('AuthController');

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
        this.logger.verbose('New User Sign Up');
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }>{
        this.logger.verbose('Detect User Sign In');
        return this.authService.signIn(authCredentialsDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/test')
    test(@Req() req) {
        console.log('req', req.user.username);
    }
}
