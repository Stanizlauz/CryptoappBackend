import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1653497126232 implements MigrationInterface {
    name = 'initial1653497126232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "phoneNo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "dateOfBirth" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "picture" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "identityNumber" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "identityNumber"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "dateOfBirth"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "phoneNo"`);
    }

}
