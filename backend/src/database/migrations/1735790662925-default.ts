import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1735790662925 implements MigrationInterface {
    name = 'Default1735790662925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "settings" ("key" character varying(255) NOT NULL, "value" text NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_c8639b7626fa94ba8265628f214" PRIMARY KEY ("key"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "settings"`);
    }

}
