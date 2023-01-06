import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhotoColumnToUserEntity1673044670223 implements MigrationInterface {
    name = 'AddPhotoColumnToUserEntity1673044670223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "photo" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "photo"`);
    }

}
