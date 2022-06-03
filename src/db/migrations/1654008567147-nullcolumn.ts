import {MigrationInterface, QueryRunner} from "typeorm";

export class nullcolumn1654008567147 implements MigrationInterface {
    name = 'nullcolumn1654008567147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transaction" DROP COLUMN "amountDeposited"`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD "amountDeposited" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP COLUMN "currentBalance"`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD "currentBalance" integer`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP COLUMN "expectedPayout"`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD "expectedPayout" integer`);
        await queryRunner.query(`ALTER TABLE "Transaction" ALTER COLUMN "endDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "identityNumber" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "identityNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Transaction" ALTER COLUMN "endDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP COLUMN "expectedPayout"`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD "expectedPayout" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP COLUMN "currentBalance"`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD "currentBalance" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP COLUMN "amountDeposited"`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD "amountDeposited" character varying NOT NULL`);
    }

}
