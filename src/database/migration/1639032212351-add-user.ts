import {MigrationInterface, QueryRunner} from "typeorm";

export class addUser1639032212351 implements MigrationInterface {
    name = 'addUser1639032212351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP DEFAULT 'now()', "updatedAt" TIMESTAMP DEFAULT 'now()', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "modifiedAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "race" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "race" ALTER COLUMN "modifiedAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "modifiedAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "modifiedAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "race_result" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "race_result" ALTER COLUMN "modifiedAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "class" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "class" ALTER COLUMN "modifiedAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "modifiedAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "modifiedAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "race" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "race" ALTER COLUMN "modifiedAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "modifiedAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "modifiedAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "race_result" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "race_result" ALTER COLUMN "modifiedAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "class" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "class" ALTER COLUMN "modifiedAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "modifiedAt" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "modifiedAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "createdAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "class" ALTER COLUMN "modifiedAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "class" ALTER COLUMN "createdAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "race_result" ALTER COLUMN "modifiedAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "race_result" ALTER COLUMN "createdAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "modifiedAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "createdAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "modifiedAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "createdAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "race" ALTER COLUMN "modifiedAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "race" ALTER COLUMN "createdAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "modifiedAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "createdAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "modifiedAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "createdAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "class" ALTER COLUMN "modifiedAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "class" ALTER COLUMN "createdAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "race_result" ALTER COLUMN "modifiedAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "race_result" ALTER COLUMN "createdAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "modifiedAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "createdAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "modifiedAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "createdAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "race" ALTER COLUMN "modifiedAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "race" ALTER COLUMN "createdAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "modifiedAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "createdAt" SET DEFAULT '2021-12-09 13:27:54.336932+07'`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
