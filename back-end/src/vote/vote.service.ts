import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { votes } from './entities/voting.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
import { People } from '../people/entities/people.entity';
import {Users} from "../users/entities/users.entity";

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(votes)
    private readonly VotesRepository: Repository<votes>,
  ) {}

  async create_vote(createVoteDto: CreateVoteDto) {
    try {
      const vote = await this.VotesRepository.create(createVoteDto);
      await this.VotesRepository.save(vote);
    } catch (e) {
      return e;
    }
  }

  async user_in_table(user: any) {
    return await this.VotesRepository.findOne({ user_id: user.user_id });
  }
}
