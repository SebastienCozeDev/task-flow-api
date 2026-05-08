import { UserResponseDto } from "../../../users/dto/user-response.dto";
import { BoardMemberDetailResponseDto } from '../board-members/board-member-detail-response.dto';
export declare class BoardDetailResponseDto {
    id: string;
    title: string;
    description?: string;
    owner: UserResponseDto;
    members: BoardMemberDetailResponseDto[];
    constructor(partial: Partial<BoardDetailResponseDto>);
}
