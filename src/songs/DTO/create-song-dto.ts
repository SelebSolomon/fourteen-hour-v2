import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly artists: string[];

  @IsNotEmpty()
  @IsDateString()
  readonly releasedDate: string;

  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: string;

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
