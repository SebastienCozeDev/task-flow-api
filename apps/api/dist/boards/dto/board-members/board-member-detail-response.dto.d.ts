import { UserResponseDto } from "../../../users/dto/user-response.dto";
export declare class BoardMemberDetailResponseDto {
    user: UserResponseDto;
    invitedBy: UserResponseDto;
    role: string;
    constructor(partial: Partial<BoardMemberDetailResponseDto>);
}
