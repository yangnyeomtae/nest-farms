import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { AuthCredentialsDto } from './dto/authCredential.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new this.userModel({ username: username, password: hashedPassword });

        try {
            await user.save();
            return user;
        } catch (err) {
            if (err.code === 11000) {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const user = await this.userModel.findOne({ username })

        if (user && await bcrypt.compare(password, user.password)) {
            //유저 토큰 생성 ( Secret + Payload )
            const payload = { username: user.username };
            const accessToken = await this.jwtService.signAsync(payload);

            return { accessToken };
        } else {
            throw new UnauthorizedException('login failed...');
        }
    }
}