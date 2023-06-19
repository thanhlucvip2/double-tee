import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserTable1683618132875 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE user (
          id BIGINT(20) NOT NULL AUTO_INCREMENT
        `,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE vvendor`);
	}
}
