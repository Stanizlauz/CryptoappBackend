import {MigrationInterface, QueryRunner} from "typeorm";

export class initia1653553142550 implements MigrationInterface {
    name = 'initia1653553142550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "gender" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "gender"`);
    }

}
