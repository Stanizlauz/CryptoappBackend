import {MigrationInterface, QueryRunner} from "typeorm";

export class new1657745887617 implements MigrationInterface {
    name = 'new1657745887617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "coin" ("id" SERIAL NOT NULL, "coin" character varying NOT NULL, CONSTRAINT "PK_650993fc71b789e4793b62fbcac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "AdminWallet" ("id" SERIAL NOT NULL, "coin" character varying NOT NULL, "walletAddress" character varying NOT NULL, CONSTRAINT "PK_d8ef8f9f97a8c96b96c5868bb13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Transaction" ("id" SERIAL NOT NULL, "coin" character varying NOT NULL, "amountDeposited" integer NOT NULL, "currentBalance" integer, "expectedPayout" integer, "transactionStatus" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL DEFAULT now(), "userEmail" character varying NOT NULL, "userName" character varying NOT NULL, "picture" character varying NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "PK_21eda4daffd2c60f76b81a270e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNo" character varying NOT NULL, "address" character varying NOT NULL, "gender" character varying NOT NULL, "dateOfBirth" TIMESTAMP NOT NULL, "picture" character varying, "identityNumber" character varying, "password" character varying NOT NULL, "confirmedUser" boolean NOT NULL DEFAULT false, "roleId" integer, CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Wallets" ("id" SERIAL NOT NULL, "coin" character varying NOT NULL, "walletAddress" character varying NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "PK_22643866c3dcd5442c341d43b67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_65c56db5a9988b90b0d7245e0f0" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_65c56db5a9988b90b0d7245e0f0"`);
        await queryRunner.query(`DROP TABLE "Wallets"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Transaction"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "AdminWallet"`);
        await queryRunner.query(`DROP TABLE "coin"`);
    }

}
