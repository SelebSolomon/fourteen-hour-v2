import { Injectable, Scope } from '@nestjs/common';
import { CreateSongDTO } from './DTO/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { UpdateSongDto } from './DTO/update-song-dto';
import { UpdateResult } from 'typeorm/browser';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';

@Injectable({ scope: Scope.TRANSIENT })
export class SongsService {
  // private readonly songs: CreateSongDTO[] = [];

  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    // song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    // find the artists based on the ids
    const artist = await this.artistsRepository.findByIds(songDTO.artists);
    // set the relations with artist and songs
    song.artists = artist;

    return await this.songsRepository.save(song);
  }

  findAll(): Promise<Song[]> {
    // throw new Error('error while fetching all songs');
    // return this.songs;
    return this.songsRepository.find();
  }

  findOne(id: number): Promise<Song | null> {
    return this.songsRepository.findOneBy({ id });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.songsRepository.delete(id);
  }

  update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
    return this.songsRepository.update(id, recordToUpdate);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    // query builder

    const queryBuilder = this.songsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'ASC');

    return paginate<Song>(queryBuilder, options);
  }
}
