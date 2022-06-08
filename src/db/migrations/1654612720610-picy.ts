import {MigrationInterface, QueryRunner} from "typeorm";

export class picy1654612720610 implements MigrationInterface {
    name = 'picy1654612720610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transaction" ADD "picture" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transaction" DROP COLUMN "picture"`);
    }

}
