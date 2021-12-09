import {MigrationInterface, QueryRunner} from "typeorm";

export class init1639023917066 implements MigrationInterface {
    name = 'init1639023917066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT 'now()', "modifiedAt" TIMESTAMP WITH TIME ZONE DEFAULT 'now()', "name" character varying(150) NOT NULL, "street" character varying(150) NOT NULL, "street2" character varying(150) NOT NULL, "city" character varying(40) NOT NULL, "state" character varying(40) NOT NULL, "zip" character varying(10) NOT NULL, "country" character varying(40) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "race" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT 'now()', "modifiedAt" TIMESTAMP WITH TIME ZONE DEFAULT 'now()', "name" character varying(50) NOT NULL, CONSTRAINT "PK_a3068b184130d87a20e516045bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."team_nationality_enum" AS ENUM('USA', 'Viet Nam')`);
        await queryRunner.query(`CREATE TABLE "team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT 'now()', "modifiedAt" TIMESTAMP WITH TIME ZONE DEFAULT 'now()', "name" character varying(150) NOT NULL, "nationality" "public"."team_nationality_enum" NOT NULL DEFAULT 'USA', "businessAddressId" uuid, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."driver_nationality_enum" AS ENUM('USA', 'Viet Nam')`);
        await queryRunner.query(`CREATE TABLE "driver" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT 'now()', "modifiedAt" TIMESTAMP WITH TIME ZONE DEFAULT 'now()', "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "nationality" "public"."driver_nationality_enum" NOT NULL DEFAULT 'USA', "homeAddressId" uuid, "managementAddressId" uuid, CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "race_result" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT 'now()', "modifiedAt" TIMESTAMP WITH TIME ZONE DEFAULT 'now()', "carNumber" integer NOT NULL, "startingPosition" integer NOT NULL, "finishingPosition" integer, "isFinished" boolean, "raceId" uuid NOT NULL, "classId" uuid NOT NULL, "carId" uuid NOT NULL, "driverId" uuid NOT NULL, CONSTRAINT "unique_result_index" UNIQUE ("carId", "raceId", "driverId"), CONSTRAINT "PK_7024d7a8eabe03520112c7df5bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "class" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT 'now()', "modifiedAt" TIMESTAMP WITH TIME ZONE DEFAULT 'now()', "name" character varying(50) NOT NULL, CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT 'now()', "modifiedAt" TIMESTAMP WITH TIME ZONE DEFAULT 'now()', "name" character varying(40) NOT NULL, "make" character varying(40) NOT NULL, "model" character varying(40) NOT NULL, "classId" uuid, "teamId" uuid, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team_drivers_driver" ("teamId" uuid NOT NULL, "driverId" uuid NOT NULL, CONSTRAINT "PK_50a0076e7095d50ddec5807504a" PRIMARY KEY ("teamId", "driverId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_485e97ade5dad15ee39746a418" ON "team_drivers_driver" ("teamId") `);
        await queryRunner.query(`CREATE INDEX "IDX_58e77587d3557f74612d9bf7a6" ON "team_drivers_driver" ("driverId") `);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_826a10e6287bbb4abfd17c04b14" FOREIGN KEY ("businessAddressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "driver" ADD CONSTRAINT "FK_36e30c29d63438e7560d02cc7e7" FOREIGN KEY ("homeAddressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "driver" ADD CONSTRAINT "FK_f162a75e923a024cb507e96e106" FOREIGN KEY ("managementAddressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "race_result" ADD CONSTRAINT "FK_21a01e7ada6c1952889cff82827" FOREIGN KEY ("raceId") REFERENCES "race"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "race_result" ADD CONSTRAINT "FK_bb9d97089c81400d350955afb3f" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "race_result" ADD CONSTRAINT "FK_5f5f3588b833e61e68dc0ebc668" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "race_result" ADD CONSTRAINT "FK_21db386a887282f10cf8b84364d" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_7f4cde2f52b7249b96d89661bfa" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_848edf6915784246d3a20d20a50" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_drivers_driver" ADD CONSTRAINT "FK_485e97ade5dad15ee39746a418a" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "team_drivers_driver" ADD CONSTRAINT "FK_58e77587d3557f74612d9bf7a6b" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_drivers_driver" DROP CONSTRAINT "FK_58e77587d3557f74612d9bf7a6b"`);
        await queryRunner.query(`ALTER TABLE "team_drivers_driver" DROP CONSTRAINT "FK_485e97ade5dad15ee39746a418a"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_848edf6915784246d3a20d20a50"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_7f4cde2f52b7249b96d89661bfa"`);
        await queryRunner.query(`ALTER TABLE "race_result" DROP CONSTRAINT "FK_21db386a887282f10cf8b84364d"`);
        await queryRunner.query(`ALTER TABLE "race_result" DROP CONSTRAINT "FK_5f5f3588b833e61e68dc0ebc668"`);
        await queryRunner.query(`ALTER TABLE "race_result" DROP CONSTRAINT "FK_bb9d97089c81400d350955afb3f"`);
        await queryRunner.query(`ALTER TABLE "race_result" DROP CONSTRAINT "FK_21a01e7ada6c1952889cff82827"`);
        await queryRunner.query(`ALTER TABLE "driver" DROP CONSTRAINT "FK_f162a75e923a024cb507e96e106"`);
        await queryRunner.query(`ALTER TABLE "driver" DROP CONSTRAINT "FK_36e30c29d63438e7560d02cc7e7"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_826a10e6287bbb4abfd17c04b14"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58e77587d3557f74612d9bf7a6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_485e97ade5dad15ee39746a418"`);
        await queryRunner.query(`DROP TABLE "team_drivers_driver"`);
        await queryRunner.query(`DROP TABLE "car"`);
        await queryRunner.query(`DROP TABLE "class"`);
        await queryRunner.query(`DROP TABLE "race_result"`);
        await queryRunner.query(`DROP TABLE "driver"`);
        await queryRunner.query(`DROP TYPE "public"."driver_nationality_enum"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TYPE "public"."team_nationality_enum"`);
        await queryRunner.query(`DROP TABLE "race"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
