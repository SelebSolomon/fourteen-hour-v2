// import { DataSource, DataSourceOptions } from 'typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// import {
//   TypeOrmModuleAsyncOptions,
//   TypeOrmModuleOptions,
// } from '@nestjs/typeorm';
// import { Song } from 'src/songs/song.entity';
// import { Artist } from 'src/artists/artist.entity';
// import { Playlist } from 'src/playlists/playlist.entity';
// import { User } from 'src/users/user.entity';

// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_PORT:', process.env.DB_PORT);
// console.log('USERNAME:', process.env.USERNAME);
// console.log('DB_PASSWORD from ConfigService:', process.env.DB_PASSWORD);
// console.log('DB_NAME:', process.env.DB_NAME);

// export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: async (
//     configService: ConfigService,
//   ): Promise<TypeOrmModuleOptions> => {
//     const password = configService.get<string>('password');
//     if (!password) {
//       throw new Error('Database password is missing');
//     }

//     return {
//       type: 'postgres',
//       host: configService.get<string>('dbHost')!,
//       port: configService.get<number>('dbPort')!,
//       username: configService.get<string>('username')!,
//       password,
//       database: configService.get<string>('dbName')!,
//       entities: [User, Playlist, Artist, Song],
//       synchronize: false,
//       migrations: ['dist/db/migrations/*.js'],
//     };
//   },
// };

// export const dataSourceOptions: DataSourceOptions = {
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT!),
//   username: process.env.USERNAME,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   entities: ['dist/**/*.entity.js'], //1
//   synchronize: false, // 2
//   migrations: ['dist/db/migrations/*.js'], // 3
// };
// const dataSource = new DataSource(dataSourceOptions); //4
// export default dataSource;

// AI GENERATED
import 'dotenv/config';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { Song } from 'src/songs/song.entity';
import { Artist } from 'src/artists/artist.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { User } from 'src/users/user.entity';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

import { DataSource, DataSourceOptions } from 'typeorm';

console.log('Loaded for CLI:', {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
});
// THIS IS USED IN APP MODULE FOR TYPEORM SETUPp
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: configService.get<string>('DB_HOST'), // exact match
      port: Number(configService.get<string>('DB_PORT')),
      username: configService.get<string>('DB_USERNAME'), // exact match
      password: configService.get<string>('DB_PASSWORD'), // exact match
      database: configService.get<string>('DB_NAME'),
      entities: [User, Playlist, Artist, Song],
      synchronize: false,
      migrations: ['dist/db/migrations/*.js'],
    };
  },
};

console.log('DataSource Options:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
});

// THIS IS USED FOR SEEDING MIGRATIONS AND TYPEORM CLI
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.USERNAME, // exact match
  password: process.env.PASSWORD, // exact match
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
