// // DEVELOPMENT OVER HERE
// import {
//   MiddlewareConsumer,
//   Module,
//   NestModule,
//   // RequestMethod,
// } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { SongsModule } from './songs/songs.module';
// import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
// import { SongsController } from './songs/songs.controller';
// import { DevConfigService } from './providers/devConfigService';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { DataSource } from 'typeorm';
// // import { Song } from './songs/song.entity';
// // import { Artist } from './artists/artist.entity';
// // import { User } from './users/user.entity';
// import { AuthModule } from './auth/auth.module';
// // import { UsersController } from './users/users.controller';
// // import { UsersService } from './users/users.service';
// import { UsersModule } from './users/users.module';
// import { ArtistsModule } from './artists/artists.module';
// import { typeOrmAsyncConfig } from 'db/data-source';
// import { SeedModule } from './seed/seed.module';
// import { ConfigModule } from '@nestjs/config';
// import configuration from './config/configuration';
// import { validate } from 'env.validation';

// const devConfig = {
//   port: 3000,
// };
// const proConfig = {
//   port: 3000,
// };

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       envFilePath: ['.env.development', '.env.production'],
//       isGlobal: true,
//       load: [configuration],
//       validate: validate,
//     }),
//     TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
//     SongsModule,
//     AuthModule,
//     UsersModule,
//     ArtistsModule,
//     SeedModule,
//   ],
//   controllers: [AppController],
//   providers: [
//     AppService,
//     {
//       provide: DevConfigService,
//       useClass: DevConfigService,
//     },

//     {
//       provide: 'CONFIG',
//       useFactory: () => {
//         return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
//       },
//     },

//     // UsersService,
//   ],
// })
// export class AppModule implements NestModule {
//   constructor(datasource: DataSource) {
//     console.log(datasource.driver.database);
//   }
//   configure(consumer: MiddlewareConsumer) {
//     // consumer.apply(LoggerMiddleware).forRoutes('songs');

//     // consumer
//     //   .apply(LoggerMiddleware)
//     //   .forRoutes({ path: 'songs', method: RequestMethod.POST });

//     consumer.apply(LoggerMiddleware).forRoutes(SongsController);
//   }
// }

// PRODUCTION OVER HERE

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './providers/devConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
// import { Song } from './songs/song.entity';
// import { Artist } from './artists/artist.entity';
// import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
// import { UsersController } from './users/users.controller';
// import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { typeOrmAsyncConfig } from 'db/data-source';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validate } from 'env.validation';

// const devConfig = {
//   port: 3000,
// };
// const proConfig = {
//   port: 3000,
// };

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV !== 'production'
          ? `.env.${process.env.NODE_ENV}`
          : undefined, // <- do NOT load a file in production
      isGlobal: true,
      load: [configuration],
      validate, // optional
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    SongsModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },

    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.PORT;
      },
    },

    // UsersService,
  ],
})
export class AppModule {}
