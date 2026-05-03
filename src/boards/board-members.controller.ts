import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Boards')
@Controller('board/members')
export class BoardMembersController {
    constructor() {}
}
