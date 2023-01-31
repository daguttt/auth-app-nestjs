import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropTableUsers1675137057574 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE users');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            last_name VARCHAR(40) NOT NULL,
            password VARCHAR(30),
            photo VARCHAR
        );
    `);
  }
}
