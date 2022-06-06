import {MigrationInterface, QueryRunner} from "typeorm";

export class coins1654279559313 implements MigrationInterface {
    name = 'coins1654279559313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "AdminWallet" ("id" SERIAL NOT NULL, "coin" character varying NOT NULL, "walletAddress" character varying NOT NULL, CONSTRAINT "PK_d8ef8f9f97a8c96b96c5868bb13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coin" ("id" SERIAL NOT NULL, "coin" character varying NOT NULL, CONSTRAINT "PK_650993fc71b789e4793b62fbcac" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "coin"`);
        await queryRunner.query(`DROP TABLE "AdminWallet"`);
    }

}
