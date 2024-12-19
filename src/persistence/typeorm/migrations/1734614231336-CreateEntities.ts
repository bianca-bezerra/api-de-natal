import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntities1734614231336 implements MigrationInterface {
    name = 'CreateEntities1734614231336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."group_status_enum" AS ENUM('pending', 'completed')`);
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."group_status_enum" NOT NULL, "hostId" integer NOT NULL, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "draw" ("id" SERIAL NOT NULL, "group_id" integer, "user_id" integer, "friend_id" integer, CONSTRAINT "PK_93d305b8405e4b975c54d609dc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_participants_user" ("groupId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_b9a71186a9290667d77020991c0" PRIMARY KEY ("groupId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_420020d3e3cfc7fe130cef88f0" ON "group_participants_user" ("groupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c4ad56936eb1e70c98292e1ed4" ON "group_participants_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "draw" ADD CONSTRAINT "FK_989b1cb5644e492359fadd0e69a" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "draw" ADD CONSTRAINT "FK_8e340eb460568cebad257d10674" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "draw" ADD CONSTRAINT "FK_87bc1432637e8818de98ff75002" FOREIGN KEY ("friend_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_participants_user" ADD CONSTRAINT "FK_420020d3e3cfc7fe130cef88f05" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_participants_user" ADD CONSTRAINT "FK_c4ad56936eb1e70c98292e1ed42" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_participants_user" DROP CONSTRAINT "FK_c4ad56936eb1e70c98292e1ed42"`);
        await queryRunner.query(`ALTER TABLE "group_participants_user" DROP CONSTRAINT "FK_420020d3e3cfc7fe130cef88f05"`);
        await queryRunner.query(`ALTER TABLE "draw" DROP CONSTRAINT "FK_87bc1432637e8818de98ff75002"`);
        await queryRunner.query(`ALTER TABLE "draw" DROP CONSTRAINT "FK_8e340eb460568cebad257d10674"`);
        await queryRunner.query(`ALTER TABLE "draw" DROP CONSTRAINT "FK_989b1cb5644e492359fadd0e69a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c4ad56936eb1e70c98292e1ed4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_420020d3e3cfc7fe130cef88f0"`);
        await queryRunner.query(`DROP TABLE "group_participants_user"`);
        await queryRunner.query(`DROP TABLE "draw"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TYPE "public"."group_status_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
