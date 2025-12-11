import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('artists')
@ApiTags('artists')
export class ArtistsController {}
