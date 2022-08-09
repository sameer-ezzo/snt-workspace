import { Module } from '@nestjs/common';
import { AntiquesController } from './controllers/antiques.controller';

import { AuctionsController } from './controllers/auctions.controller';
import { AppService } from './app.service';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './services/users.service';
import { AuthService, jwtConstants } from './services/auth.service';
import { JwtStrategy } from './services/jwt-strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuctionsController, AntiquesController],
  providers: [AppService, UsersService, AuthService, JwtStrategy],
})
export class AppModule { }
