"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema1778081673810 = void 0;
class InitialSchema1778081673810 {
    name = 'InitialSchema1778081673810';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "displayName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "maxBoard" integer NOT NULL DEFAULT '3', "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "owner_id" uuid NOT NULL, "title" character varying(120) NOT NULL, "description" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."task_state_enum" AS ENUM('draft', 'todo', 'in progress', 'done', 'archived')`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(120) NOT NULL, "description" character varying(255), "board_id" uuid NOT NULL, "created_by_id" uuid, "last_updated_by_id" uuid, "assigned_to_id" uuid, "state" "public"."task_state_enum" NOT NULL DEFAULT 'draft', "imageLink" character varying(255), "moreLink" character varying(255), "dueDate" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."board_member_role_enum" AS ENUM('reader', 'editor', 'maintainer', 'owner')`);
        await queryRunner.query(`CREATE TABLE "board_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "board_id" uuid NOT NULL, "user_id" uuid NOT NULL, "invited_by_id" uuid NOT NULL, "role" "public"."board_member_role_enum" NOT NULL DEFAULT 'reader', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_board_member_user_board" UNIQUE ("user_id", "board_id"), CONSTRAINT "PK_c27bedbf846391cf1af5e4a74d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_cd3ee1b689dde31c328d2f0cc88" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_42a2758d8eff27aa9f58b642c21" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_8c02c2c774eff4192dd44533db3" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_18f1c7ea580e03258496574a9e5" FOREIGN KEY ("last_updated_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_56caed544250017dfb635ac4374" FOREIGN KEY ("assigned_to_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board_member" ADD CONSTRAINT "FK_7e08925f64fa27df024af1b5dd0" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board_member" ADD CONSTRAINT "FK_1538230157f7f467a98d54ccc03" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board_member" ADD CONSTRAINT "FK_4abd6253c2c32672b5186351254" FOREIGN KEY ("invited_by_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "board_member" DROP CONSTRAINT "FK_4abd6253c2c32672b5186351254"`);
        await queryRunner.query(`ALTER TABLE "board_member" DROP CONSTRAINT "FK_1538230157f7f467a98d54ccc03"`);
        await queryRunner.query(`ALTER TABLE "board_member" DROP CONSTRAINT "FK_7e08925f64fa27df024af1b5dd0"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_56caed544250017dfb635ac4374"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_18f1c7ea580e03258496574a9e5"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_8c02c2c774eff4192dd44533db3"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_42a2758d8eff27aa9f58b642c21"`);
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_cd3ee1b689dde31c328d2f0cc88"`);
        await queryRunner.query(`DROP TABLE "board_member"`);
        await queryRunner.query(`DROP TYPE "public"."board_member_role_enum"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TYPE "public"."task_state_enum"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }
}
exports.InitialSchema1778081673810 = InitialSchema1778081673810;
//# sourceMappingURL=1778081673810-InitialSchema.js.map