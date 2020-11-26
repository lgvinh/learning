import {MigrationInterface, QueryRunner} from "typeorm";

export class InitMigration1599926941544 implements MigrationInterface {
    name = 'InitMigration1599926941544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "art" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(), "deletedAt" TIMESTAMP DEFAULT null, "name" character varying NOT NULL, "image" character varying NOT NULL, "description" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_d7867f9fa7239b188ec631066bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(), "deletedAt" TIMESTAMP DEFAULT null, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying DEFAULT null, "about" character varying DEFAULT null, "role" integer NOT NULL DEFAULT 0, "status" integer NOT NULL DEFAULT 0, CONSTRAINT "UQ_52b61cb2bc64db2e4873b4a5c02" UNIQUE ("name", "email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(), "deletedAt" TIMESTAMP DEFAULT null, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_d3962fd11a54d87f927e84d1080" UNIQUE ("name"), CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(), "deletedAt" TIMESTAMP DEFAULT null, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comic" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(), "deletedAt" TIMESTAMP DEFAULT null, "name" character varying NOT NULL, "subName" character varying DEFAULT null, "description" character varying NOT NULL, "translator" character varying DEFAULT null, "status" integer NOT NULL DEFAULT 0, "progress" integer NOT NULL DEFAULT 0, CONSTRAINT "UQ_6abab5bfab42b1fb50055d43795" UNIQUE ("name"), CONSTRAINT "PK_071fba28990ddf3518fcd165624" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chapter" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(), "deletedAt" TIMESTAMP DEFAULT null, "name" character varying NOT NULL, "images" character varying array NOT NULL, "comicId" integer, CONSTRAINT "UQ_02782d7f837ca2989ce87f03ca0" UNIQUE ("name"), CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comic_authors_author" ("comicId" integer NOT NULL, "authorId" integer NOT NULL, CONSTRAINT "PK_c5466d3de78a0f1780303213a98" PRIMARY KEY ("comicId", "authorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_948a332e61351cb316f727ce87" ON "comic_authors_author" ("comicId") `);
        await queryRunner.query(`CREATE INDEX "IDX_737f2e1ee54371e7438a20e787" ON "comic_authors_author" ("authorId") `);
        await queryRunner.query(`CREATE TABLE "comic_tags_tag" ("comicId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_bddfef3ccdc42bd44044c41dea9" PRIMARY KEY ("comicId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_846a9dcb2cebe51b6f18dbd3d3" ON "comic_tags_tag" ("comicId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8d426f8c1c35cccd8f8be50d0c" ON "comic_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "art" ADD CONSTRAINT "FK_02abb54c28a7a61bed2b8491c1d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD CONSTRAINT "FK_d1cb760ad7dbcac10bc931e9ae3" FOREIGN KEY ("comicId") REFERENCES "comic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comic_authors_author" ADD CONSTRAINT "FK_948a332e61351cb316f727ce87e" FOREIGN KEY ("comicId") REFERENCES "comic"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comic_authors_author" ADD CONSTRAINT "FK_737f2e1ee54371e7438a20e7878" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comic_tags_tag" ADD CONSTRAINT "FK_846a9dcb2cebe51b6f18dbd3d32" FOREIGN KEY ("comicId") REFERENCES "comic"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comic_tags_tag" ADD CONSTRAINT "FK_8d426f8c1c35cccd8f8be50d0cc" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comic_tags_tag" DROP CONSTRAINT "FK_8d426f8c1c35cccd8f8be50d0cc"`);
        await queryRunner.query(`ALTER TABLE "comic_tags_tag" DROP CONSTRAINT "FK_846a9dcb2cebe51b6f18dbd3d32"`);
        await queryRunner.query(`ALTER TABLE "comic_authors_author" DROP CONSTRAINT "FK_737f2e1ee54371e7438a20e7878"`);
        await queryRunner.query(`ALTER TABLE "comic_authors_author" DROP CONSTRAINT "FK_948a332e61351cb316f727ce87e"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP CONSTRAINT "FK_d1cb760ad7dbcac10bc931e9ae3"`);
        await queryRunner.query(`ALTER TABLE "art" DROP CONSTRAINT "FK_02abb54c28a7a61bed2b8491c1d"`);
        await queryRunner.query(`DROP INDEX "IDX_8d426f8c1c35cccd8f8be50d0c"`);
        await queryRunner.query(`DROP INDEX "IDX_846a9dcb2cebe51b6f18dbd3d3"`);
        await queryRunner.query(`DROP TABLE "comic_tags_tag"`);
        await queryRunner.query(`DROP INDEX "IDX_737f2e1ee54371e7438a20e787"`);
        await queryRunner.query(`DROP INDEX "IDX_948a332e61351cb316f727ce87"`);
        await queryRunner.query(`DROP TABLE "comic_authors_author"`);
        await queryRunner.query(`DROP TABLE "chapter"`);
        await queryRunner.query(`DROP TABLE "comic"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "art"`);
    }

}
