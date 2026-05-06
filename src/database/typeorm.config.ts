import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";

export const typeOrmConfig: TypeOrmModuleOptions & DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV === 'development',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
};
