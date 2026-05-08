"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const board_entity_1 = require("../boards/entities/board.entity");
const task_entity_1 = require("../tasks/entities/task.entity");
const board_member_entity_1 = require("../boards/entities/board-member.entity");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [user_entity_1.User, board_entity_1.Board, task_entity_1.Task, board_member_entity_1.BoardMember],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
//# sourceMappingURL=data-source.js.map