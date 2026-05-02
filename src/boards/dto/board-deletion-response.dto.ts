import { ApiProperty } from '@nestjs/swagger';


export class BoardDeletionResponseDto {
    @ApiProperty({ example: 'Your board has been deleted successfully', description: 'The message of the response' })
    message: string;

    constructor(partial: Partial<BoardDeletionResponseDto>) {
        Object.assign(this, partial);
    }
}
