import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  // HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './DTO/create-song-dto';
import type { Connection } from 'src/common/constants/connection';
import { Song } from './song.entity';
import { DeleteResult } from 'typeorm';
import { UpdateSongDto } from './DTO/update-song-dto';
import { UpdateResult } from 'typeorm/browser';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistJwtGuard } from 'src/auth/artists-jwt-guard';
// import { request } from 'http';

@Controller({ path: 'songs', scope: Scope.REQUEST })
export class SongsController {
  constructor(
    private songService: SongsService,
    @Inject('CONNECTION')
    private connection: Connection,
  ) {
    console.log('connection string', connection.CONNECTION_STRING);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songService.paginate({
      page,
      limit,
    });
  }

  @Post()
  @UseGuards(ArtistJwtGuard)
  create(
    @Body()
    createSOngDTO: CreateSongDTO,
    @Request()
    request,
  ): Promise<Song> {
    console.log('logined user', request.user);
    console.log('Creating song DTO', createSOngDTO);
    return this.songService.create(createSOngDTO);
  }
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song | null> {
    return this.songService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songService.update(id, updateSongDto);
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<DeleteResult> {
    return this.songService.remove(id);
  }
}
