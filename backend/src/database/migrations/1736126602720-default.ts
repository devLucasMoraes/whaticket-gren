import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1736126602720 implements MigrationInterface {
    name = 'Default1736126602720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_queues" DROP CONSTRAINT "FK_44cf2a98ac6c23163a7cbe53aa7"`);
        await queryRunner.query(`ALTER TABLE "user_queues" DROP CONSTRAINT "FK_6e6c1ef085c6abe39f8fbac56d8"`);
        await queryRunner.query(`CREATE TABLE "whatsapp_queues" ("whatsappsId" integer NOT NULL, "queuesId" integer NOT NULL, CONSTRAINT "PK_f96fd538638b489f8d2b4e9e298" PRIMARY KEY ("whatsappsId", "queuesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_00c4b05341d75f2bfdecc152c1" ON "whatsapp_queues" ("whatsappsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_16bd142d7bc5f90339531958ad" ON "whatsapp_queues" ("queuesId") `);
        await queryRunner.query(`ALTER TABLE "user_queues" DROP CONSTRAINT "PK_121fb65bf0236cd2b64be9a676e"`);
        await queryRunner.query(`ALTER TABLE "user_queues" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user_queues" DROP COLUMN "createdDate"`);
        await queryRunner.query(`ALTER TABLE "user_queues" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "user_queues" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user_queues" DROP COLUMN "queueId"`);
        await queryRunner.query(`ALTER TABLE "user_queues" ADD "usersId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_queues" ADD CONSTRAINT "PK_22fba0c485e54f352ca359fba5a" PRIMARY KEY ("usersId")`);
        await queryRunner.query(`ALTER TABLE "user_queues" ADD "queuesId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_queues" DROP CONSTRAINT "PK_22fba0c485e54f352ca359fba5a"`);
        await queryRunner.query(`ALTER TABLE "user_queues" ADD CONSTRAINT "PK_c8fc26c680a9510a5b8a250be4a" PRIMARY KEY ("usersId", "queuesId")`);
        await queryRunner.query(`CREATE INDEX "IDX_22fba0c485e54f352ca359fba5" ON "user_queues" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_28af8b511185e44ff142a5b357" ON "user_queues" ("queuesId") `);
        await queryRunner.query(`ALTER TABLE "whatsapp_queues" ADD CONSTRAINT "FK_00c4b05341d75f2bfdecc152c1d" FOREIGN KEY ("whatsappsId") REFERENCES "whatsapps"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "whatsapp_queues" ADD CONSTRAINT "FK_16bd142d7bc5f90339531958ad0" FOREIGN KEY ("queuesId") REFERENCES "queues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_queues" ADD CONSTRAINT "FK_22fba0c485e54f352ca359fba5a" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_queues" ADD CONSTRAINT "FK_28af8b511185e44ff142a5b3572" FOREIGN KEY ("queuesId") REFERENCES "queues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_queues" DROP CONSTRAINT "FK_28af8b511185e44ff142a5b3572"`);
        await queryRunner.query(`ALTER TABLE "user_queues" DROP CONSTRAINT "FK_22fba0c485e54f352ca359fba5a"`);
        await queryRunner.query(`ALTER TABLE "whatsapp_queues" DROP CONSTRAINT "FK_16bd142d7bc5f90339531958ad0"`);
        await queryRunner.query(`ALTER TABLE "whatsapp_queues" DROP CONSTRAINT "FK_00c4b05341d75f2bfdecc152c1d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_28af8b511185e44ff142a5b357"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_22fba0c485e54f352ca359fba5"`);
        await queryRunner.query(`ALTER TABLE "user_queues" DROP CONSTRAINT "PK_c8fc26c680a9510a5b8a250be4a"`);
        await queryRunner.query(`ALTER TABLE "user_queues" ADD CONSTRAINT "PK_22fba0c485e54f352ca359fba5a" PRIMARY KEY ("usersId")`);
        await queryRunner.query(`ALTER TABLE "user_queues" DROP COLUMN "queuesId"`);
        await queryRunner.query(`ALTER TABLE "user_queues" DROP CONSTRAINT "PK_22fba0c485e54f352ca359fba5a"`);
        await queryRunner.query(`ALTER TABLE "user_queues" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "user_queues" ADD "queueId" integer`);
        await queryRunner.query(`ALTER TABLE "user_queues" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_queues" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_queues" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_queues" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_queues" ADD CONSTRAINT "PK_121fb65bf0236cd2b64be9a676e" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_16bd142d7bc5f90339531958ad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_00c4b05341d75f2bfdecc152c1"`);
        await queryRunner.query(`DROP TABLE "whatsapp_queues"`);
        await queryRunner.query(`ALTER TABLE "user_queues" ADD CONSTRAINT "FK_6e6c1ef085c6abe39f8fbac56d8" FOREIGN KEY ("queueId") REFERENCES "queues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_queues" ADD CONSTRAINT "FK_44cf2a98ac6c23163a7cbe53aa7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
