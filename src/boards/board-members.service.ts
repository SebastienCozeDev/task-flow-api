import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { BoardMember } from "./entities/board-member.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BoardMembersService {
    constructor(
        @InjectRepository(BoardMember)
        private readonly boardMembersRespository: Repository<BoardMember>
    ) {}
}
