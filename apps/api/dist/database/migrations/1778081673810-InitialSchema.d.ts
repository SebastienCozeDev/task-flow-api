import type { MigrationInterface, QueryRunner } from "typeorm";
export declare class InitialSchema1778081673810 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
