import {MigrationInterface, QueryRunner} from "typeorm";

export class verify1655931623079 implements MigrationInterface {
    name = 'verify1655931623079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transaction" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "confirmedUser" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Transaction" ALTER COLUMN "picture" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transaction" ALTER COLUMN "picture" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "confirmedUser"`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD "endDate" TIMESTAMP`);
    }

}
