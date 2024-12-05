import { MigrationInterface, QueryRunner } from 'typeorm';

export class Blog1733384886941 implements MigrationInterface {
  name = 'Blog1733384886941';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blog" ("id" BIGSERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" character varying(255) NOT NULL, "image" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "blog"`);
  }
}
