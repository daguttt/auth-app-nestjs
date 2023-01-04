import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveAgeColumnFromUser1672872804697 implements MigrationInterface {
    name = 'RemoveAgeColumnFromUser1672872804697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "age" smallint NOT NULL`);
    }

}
