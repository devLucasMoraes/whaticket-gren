import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1736032991103 implements MigrationInterface {
    name = 'Default1736032991103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "whatsapp_queue" ("whatsappsId" integer NOT NULL, "queuesId" integer NOT NULL, CONSTRAINT "PK_23eea18e2e3420f86c5aa97045d" PRIMARY KEY ("whatsappsId", "queuesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_af03bb510a340bdd7fbc9746be" ON "whatsapp_queue" ("whatsappsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_70773309947f35f2f4be33b5cc" ON "whatsapp_queue" ("queuesId") `);
        await queryRunner.query(`ALTER TABLE "whatsapp_queue" ADD CONSTRAINT "FK_af03bb510a340bdd7fbc9746be5" FOREIGN KEY ("whatsappsId") REFERENCES "whatsapps"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "whatsapp_queue" ADD CONSTRAINT "FK_70773309947f35f2f4be33b5cc8" FOREIGN KEY ("queuesId") REFERENCES "queues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "whatsapp_queue" DROP CONSTRAINT "FK_70773309947f35f2f4be33b5cc8"`);
        await queryRunner.query(`ALTER TABLE "whatsapp_queue" DROP CONSTRAINT "FK_af03bb510a340bdd7fbc9746be5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_70773309947f35f2f4be33b5cc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_af03bb510a340bdd7fbc9746be"`);
        await queryRunner.query(`DROP TABLE "whatsapp_queue"`);
    }

}
