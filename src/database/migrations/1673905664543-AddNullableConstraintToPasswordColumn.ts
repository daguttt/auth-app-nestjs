import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullableConstraintToPasswordColumn1673905664543 implements MigrationInterface {
    name = 'AddNullableConstraintToPasswordColumn1673905664543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
    }

}
