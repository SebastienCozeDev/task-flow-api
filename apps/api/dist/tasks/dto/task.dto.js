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
exports.TaskDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class TaskDto {
    description;
    imageLink;
    moreLink;
    dueDate;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.TaskDto = TaskDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'My Super Description', description: 'The description of the task' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://sebastien.cozedev.com/img/icon.png', description: 'The image link of the task' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskDto.prototype, "imageLink", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://sebastien.cozedev.com/', description: 'The link of the task to get more detail' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskDto.prototype, "moreLink", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-05-05', description: 'The due date of the task' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], TaskDto.prototype, "dueDate", void 0);
//# sourceMappingURL=task.dto.js.map