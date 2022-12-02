import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMigration1669951549107 implements MigrationInterface {
    name = 'UserMigration1669951549107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "lastName" character varying(60) NOT NULL, "email" character varying NOT NULL, "password" character varying(20) NOT NULL, "age" smallint NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
