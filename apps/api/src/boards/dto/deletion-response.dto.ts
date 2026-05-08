import { ApiProperty } from '@nestjs/swagger';


export class DeletionResponseDto {
    @ApiProperty({ example: 'Your board has been deleted successfully', description: 'The message of the response' })
    message: string;

    constructor(partial: Partial<DeletionResponseDto>) {
        Object.assign(this, partial);
    }
}
