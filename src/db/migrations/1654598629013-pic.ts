import {MigrationInterface, QueryRunner} from "typeorm";

export class pic1654598629013 implements MigrationInterface {
    name = 'pic1654598629013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transaction" ADD "picture" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transaction" DROP COLUMN "picture"`);
    }

}
