import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1735788152141 implements MigrationInterface {
    name = 'Default1735788152141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact_custom_fields" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "value" character varying(255) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "contact_id" integer, CONSTRAINT "PK_442e354e5cd1302041a947b166e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" character varying(255) NOT NULL, "ack" integer NOT NULL, "read" boolean NOT NULL, "fromMe" boolean NOT NULL, "body" text NOT NULL, "mediaType" character varying(255), "isDeleted" boolean NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "quoted_msg_id" character varying(255), "ticket_id" integer, "contact_id" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "number" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "profilePicUrl" character varying(255), "isGroup" boolean NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_queues" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "queueId" integer, CONSTRAINT "PK_121fb65bf0236cd2b64be9a676e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "whatsapps" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "session" text, "qrcode" text, "status" character varying(255), "battery" character varying(255), "plugged" boolean NOT NULL, "retries" integer NOT NULL, "greetingMessage" text, "farewellMessage" text, "isDefault" boolean NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_17f5cbe8bf9c422d3eadeacce12" UNIQUE ("name"), CONSTRAINT "PK_3d3312f22bcd7d0dafb92a0409a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "whatsapp_queues" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "whatsappId" integer, "queueId" integer, CONSTRAINT "PK_fb080edb01d5d34a36be1574db0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "queues" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "color" character varying(255) NOT NULL, "greetingMessage" text, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_a290d70c28ba7f1c5d2600da849" UNIQUE ("name"), CONSTRAINT "UQ_3392ec68a932e71989438cb68f4" UNIQUE ("color"), CONSTRAINT "PK_d966f9eb39a9396658387071bb3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" SERIAL NOT NULL, "status" character varying(255) NOT NULL, "unreadMessages" integer, "lastMessage" text, "isGroup" boolean NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "user_id" uuid, "contact_id" integer, "whatsapp_id" integer, "queue_id" integer, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quick_answers" ("id" SERIAL NOT NULL, "shortcut" text NOT NULL, "message" text NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_d6942d17b0724a135f2e3abf947" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "whatsapp_id" integer`);
        await queryRunner.query(`ALTER TABLE "contact_custom_fields" ADD CONSTRAINT "FK_237f9096cf99baab041452d5bdc" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_e20c70c0857d55c2a1d331d7746" FOREIGN KEY ("quoted_msg_id") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_aa8e62e23565f59d22160b35f18" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_d109211ed510ef10617c5e75927" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_queues" ADD CONSTRAINT "FK_44cf2a98ac6c23163a7cbe53aa7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_queues" ADD CONSTRAINT "FK_6e6c1ef085c6abe39f8fbac56d8" FOREIGN KEY ("queueId") REFERENCES "queues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "whatsapp_queues" ADD CONSTRAINT "FK_4308494b483efaa2332369a8a49" FOREIGN KEY ("whatsappId") REFERENCES "whatsapps"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "whatsapp_queues" ADD CONSTRAINT "FK_954ff9c885b1ab4a6f5a08b8680" FOREIGN KEY ("queueId") REFERENCES "queues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_2e445270177206a97921e461710" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_38b2f9803395427e46eb3467312" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_77ae966249b44e79d194492318e" FOREIGN KEY ("whatsapp_id") REFERENCES "whatsapps"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_4e7a878321b2c5f669030dfb8b8" FOREIGN KEY ("queue_id") REFERENCES "queues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_21590b687d0b09416b00398d20e" FOREIGN KEY ("whatsapp_id") REFERENCES "whatsapps"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_21590b687d0b09416b00398d20e"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_4e7a878321b2c5f669030dfb8b8"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_77ae966249b44e79d194492318e"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_38b2f9803395427e46eb3467312"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_2e445270177206a97921e461710"`);
        await queryRunner.query(`ALTER TABLE "whatsapp_queues" DROP CONSTRAINT "FK_954ff9c885b1ab4a6f5a08b8680"`);
        await queryRunner.query(`ALTER TABLE "whatsapp_queues" DROP CONSTRAINT "FK_4308494b483efaa2332369a8a49"`);
        await queryRunner.query(`ALTER TABLE "user_queues" DROP CONSTRAINT "FK_6e6c1ef085c6abe39f8fbac56d8"`);
        await queryRunner.query(`ALTER TABLE "user_queues" DROP CONSTRAINT "FK_44cf2a98ac6c23163a7cbe53aa7"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_d109211ed510ef10617c5e75927"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_aa8e62e23565f59d22160b35f18"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_e20c70c0857d55c2a1d331d7746"`);
        await queryRunner.query(`ALTER TABLE "contact_custom_fields" DROP CONSTRAINT "FK_237f9096cf99baab041452d5bdc"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "whatsapp_id"`);
        await queryRunner.query(`DROP TABLE "quick_answers"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TABLE "queues"`);
        await queryRunner.query(`DROP TABLE "whatsapp_queues"`);
        await queryRunner.query(`DROP TABLE "whatsapps"`);
        await queryRunner.query(`DROP TABLE "user_queues"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "contact_custom_fields"`);
    }

}
