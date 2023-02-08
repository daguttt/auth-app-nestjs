import { MigrationInterface, QueryRunner } from 'typeorm';

export class RecreateUsersTable1675202973879 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                full_name VARCHAR(60),
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR,
                photo VARCHAR
            );
        `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE users');
  }
}
