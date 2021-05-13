import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePeopleDto } from './dto/create-people.dto';
import { FindPeopleDto } from './dto/find-people.dto';
import JwtAuthenticationGuard from '../common/guard/jwt.auth.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { extname } from 'path';
import { of } from 'rxjs';

import { DeletePeopleDto } from './dto/delete-people.dto';


@Controller('api/uploading_people')
export class PeopleController {
  constructor(private readonly PeopleService: PeopleService) {}

  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('Photo', { dest: './Photo' }))
  @Post('/create')
  async createPeople(
    @Body() createPeopleDto: CreatePeopleDto,
    @Req() request: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const user_id = request.user.id;
      if (file != undefined) {
        await this.PeopleService.create(
          createPeopleDto,
          user_id,
          file.filename,
        );
      } else {
        await this.PeopleService.create(createPeopleDto, user_id, null);
      }
      return { message: 'ok' };
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  @Post('find_people')
  async find(@Body() FindPeopleDto: FindPeopleDto) {
    try {
      return await this.PeopleService.findAll(FindPeopleDto);
    } catch (e) {
      return e;
    }
  }

  @Get('photo/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    return of(res.sendFile(fileId, { root: 'Photo' }));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('all_people')
  async all_people() {
    return this.PeopleService.return_all();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('delete_people')
  async delete(
    @Body() deletePeopleDto: DeletePeopleDto,
    @Req() request: RequestWithUser,
  ) {
    try {
      console.log(request.user)
      return await this.PeopleService.delete_people(
        request.user,
        deletePeopleDto,
      );
    } catch (e) {
      return e;
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('admin')
  async is_admin(@Req() request: RequestWithUser) {
     try {
       return await this.PeopleService.is_admin(request.user)
     }
      catch (e) {
       console.log(e);
       return e;
     }
  }
}


