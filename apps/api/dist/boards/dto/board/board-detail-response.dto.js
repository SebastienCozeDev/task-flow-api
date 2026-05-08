"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardDetailResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_response_dto_1 = require("../../../users/dto/user-response.dto");
class BoardDetailResponseDto {
    id;
    title;
    description;
    owner;
    members;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.BoardDetailResponseDto = BoardDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the board' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BoardDetailResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'My Super Board', description: 'The title of the board' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BoardDetailResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'My Super Description', description: 'The description of the board' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BoardDetailResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The owner of the board' }),
    __metadata("design:type", user_response_dto_1.UserResponseDto)
], BoardDetailResponseDto.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The members of the board' }),
    __metadata("design:type", Array)
], BoardDetailResponseDto.prototype, "members", void 0);
//# sourceMappingURL=board-detail-response.dto.js.map